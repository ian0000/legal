import Case from "../../models/Case";
import Client from "../../models/Client";
import { checkPassword, createSendTokenClient, hashPassword } from "../../utils/auth";
import { generateJWT } from "../../utils/jwt";
import { tempPassword } from "../../utils/token";
import { USER_ROLES } from "@legal/shared/types/roles";

export const getCasesByNationalId = async (nationalId: string) => {
  const client = await Client.findOne({ nationalId, isActive: true });
  if (!client) throw new Error("Cliente no encontrado");

  const cases = await Case.find({ client: client._id }).select("title status createdAt");

  return cases;
};

export const loginClient = async (email: string, password: string) => {
  const client = await Client.findOne({ email });

  if (!client) throw new Error("Credenciales inválidas");
  if (!client.isConfirmed) throw new Error("Cuenta no confirmada");
  if (!client.isActive) throw new Error("Cuenta inactiva");

  const isMatch = await checkPassword(password, client.password!);
  if (!isMatch) throw new Error("Credenciales inválidas");

  await client.save();

  return generateJWT({ id: client._id, role: USER_ROLES.CLIENT });
};

export const getProfile = async (id: string) => {
  return Client.findById(id).select("-password");
};

export const updateProfile = async (id: string, data: any) => {
  return Client.findByIdAndUpdate(
    id,
    { phone: data.phone, address: data.address },
    { new: true },
  ).select("-password");
};

export const createClient = async (data: any) => {
  const exists = await Client.findOne({
    $or: [{ email: data.email }, { nationalId: data.nationalId }],
  });

  if (exists) throw new Error("Cliente ya existe");

  const client = new Client({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    nationalId: data.nationalId,
    isConfirmed: false,
    isActive: true,
    password: null,
  });

  await client.save();

  return client;
};

export const requestAccess = async (email: string) => {
  const client = await Client.findOne({ email, isActive: true });

  if (!client) throw new Error("Cliente no encontrado");
  if (client.lastAccessRequest && Date.now() - client.lastAccessRequest.getTime() < 2 * 60 * 1000) {
    throw new Error("Espera antes de solicitar otra clave");
  }
  client.lastAccessRequest = new Date();
  // generar clave temporal
  await createSendTokenClient(client);
  // ⚠️ aquí luego irá email real
  console.log("Clave temporal:", tempPassword);

  return { message: "Clave enviada al correo" };
};
export const changePassword = async (id: string, currentPassword: string, newPassword: string) => {
  const client = await Client.findById(id);

  if (!client) throw new Error("Cliente no encontrado");

  const match = await checkPassword(currentPassword, client.password!);
  if (!match) throw new Error("Contraseña actual incorrecta");

  const hashed = await hashPassword(newPassword);
  client.password = hashed;

  await client.save();

  return { message: "Contraseña actualizada" };
};
