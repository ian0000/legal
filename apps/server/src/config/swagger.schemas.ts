// ======================================================
// COMMON
// ======================================================

export const swaggerSchemas = {
  ObjectId: {
    type: "string",
    example: "681d0f8f8d7c4b0012f34abc",
  },

  TimestampFields: {
    type: "object",

    properties: {
      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  SoftDeleteFields: {
    type: "object",

    properties: {
      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },
    },
  },

  PaginationMeta: {
    type: "object",

    properties: {
      total: {
        type: "number",
        example: 100,
      },

      page: {
        type: "number",
        example: 1,
      },

      limit: {
        type: "number",
        example: 10,
      },

      totalPages: {
        type: "number",
        example: 10,
      },
    },
  },

  SuccessResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      message: {
        type: "string",
        example: "Operación realizada correctamente",
      },
    },
  },

  ErrorResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: false,
      },

      message: {
        type: "string",
        example: "Ha ocurrido un error",
      },
    },
  },

  ValidationErrorResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: false,
      },

      message: {
        type: "string",
        example: "Errores de validación",
      },

      errors: {
        type: "array",

        items: {
          type: "object",

          properties: {
            field: {
              type: "string",
            },

            message: {
              type: "string",
            },
          },
        },
      },
    },
  },

  PaginatedResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      data: {
        type: "array",

        items: {
          type: "object",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  FileUploadResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      message: {
        type: "string",
      },

      fileUrl: {
        type: "string",
      },
    },
  },

  // ======================================================
  // ENUMS
  // ======================================================

  UserRole: {
    type: "string",

    enum: ["admin", "lawyer", "assistant", "secretary", "client"],

    example: "lawyer",
  },

  TokenType: {
    type: "string",

    enum: ["verify_email", "forgot_password", "reset_password"],

    example: "verify_email",
  },

  CaseStatus: {
    type: "string",

    enum: ["active", "pending", "completed", "cancelled", "closed"],

    example: "active",
  },

  CaseStageStatus: {
    type: "string",

    enum: ["pending", "in_progress", "completed", "delayed", "cancelled"],

    example: "pending",
  },

  NotificationPriority: {
    type: "string",

    enum: ["low", "medium", "high", "urgent"],

    example: "medium",
  },

  PaymentType: {
    type: "string",

    enum: ["income", "expense"],

    example: "income",
  },

  PaymentStatus: {
    type: "string",

    enum: ["pending", "completed", "cancelled"],

    example: "completed",
  },

  PaymentMethod: {
    type: "string",

    enum: ["cash", "transfer", "card", "check", "other"],

    example: "transfer",
  },

  FinanceSourceType: {
    type: "string",

    enum: ["manual", "case_payment"],

    example: "manual",
  },

  ActivityAction: {
    type: "string",

    enum: [
      "create_case",
      "update_case",
      "delete_case",
      "create_stage",
      "update_stage",
      "complete_stage",
      "upload_document",
      "create_note",
      "register_payment",
      "login",
      "logout",
    ],

    example: "create_case",
  },

  // ======================================================
  // AUTH
  // ======================================================

  LoginDTO: {
    type: "object",

    required: ["email", "password"],

    properties: {
      email: {
        type: "string",
        format: "email",
        example: "admin@test.com",
      },

      password: {
        type: "string",
        format: "password",
        example: "Password123*",
      },
    },
  },

  RegisterDTO: {
    type: "object",

    required: ["firstName", "lastName", "email", "password"],

    properties: {
      firstName: {
        type: "string",
        example: "Ian",
      },

      lastName: {
        type: "string",
        example: "Mena",
      },

      email: {
        type: "string",
        format: "email",
        example: "ian@test.com",
      },

      password: {
        type: "string",
        format: "password",
        example: "Password123*",
      },

      role: {
        $ref: "#/components/schemas/UserRole",
      },
    },
  },

  ForgotPasswordDTO: {
    type: "object",

    required: ["email"],

    properties: {
      email: {
        type: "string",
        format: "email",
        example: "user@test.com",
      },
    },
  },

  ResetPasswordDTO: {
    type: "object",

    required: ["token", "password"],

    properties: {
      token: {
        type: "string",
        example: "jwt-or-reset-token",
      },

      password: {
        type: "string",
        format: "password",
        example: "NewPassword123*",
      },
    },
  },

  VerifyEmailDTO: {
    type: "object",

    required: ["token"],

    properties: {
      token: {
        type: "string",
        example: "verify-email-token",
      },
    },
  },

  RefreshTokenDTO: {
    type: "object",

    required: ["refreshToken"],

    properties: {
      refreshToken: {
        type: "string",
        example: "refresh-jwt-token",
      },
    },
  },

  AuthResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      token: {
        type: "string",
      },

      refreshToken: {
        type: "string",
      },

      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },

  RefreshTokenResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      token: {
        type: "string",
      },

      refreshToken: {
        type: "string",
      },
    },
  },

  CurrentUserResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },

  // ======================================================
  // VERIFICATION TOKEN
  // ======================================================

  VerificationToken: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      token: {
        type: "string",
      },

      type: {
        $ref: "#/components/schemas/TokenType",
      },

      user: {
        $ref: "#/components/schemas/ObjectId",
      },

      usedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
  // ======================================================
  // USERS
  // ======================================================
};

Object.assign(swaggerSchemas, {
  User: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      firstName: {
        type: "string",
        example: "Ian",
      },

      lastName: {
        type: "string",
        example: "Mena",
      },

      email: {
        type: "string",
        format: "email",
        example: "ian@test.com",
      },

      password: {
        type: "string",
        example: "$2b$10$encrypted",
      },

      phone: {
        type: "string",
        nullable: true,
        example: "+593999999999",
      },

      cedula: {
        type: "string",
        nullable: true,
        example: "1723456789",
      },

      role: {
        $ref: "#/components/schemas/UserRole",
      },

      isConfirmed: {
        type: "boolean",
        example: true,
      },

      isActive: {
        type: "boolean",
        example: true,
      },

      profileImage: {
        type: "object",
        nullable: true,

        properties: {
          data: {
            type: "string",
            format: "binary",
          },

          contentType: {
            type: "string",
            example: "image/png",
          },

          filename: {
            type: "string",
            example: "profile.png",
          },

          uploadedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      permissions: {
        type: "array",

        items: {
          type: "string",
        },

        example: ["create_case", "update_case"],
      },

      createdBy: {
        $ref: "#/components/schemas/ObjectId",
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateUserDTO: {
    type: "object",

    required: ["firstName", "lastName", "email"],

    properties: {
      firstName: {
        type: "string",
        example: "Ian",
      },

      lastName: {
        type: "string",
        example: "Mena",
      },

      email: {
        type: "string",
        format: "email",
        example: "ian@test.com",
      },

      role: {
        $ref: "#/components/schemas/UserRole",
      },
    },
  },

  UpdateUserDTO: {
    type: "object",

    properties: {
      firstName: {
        type: "string",
        example: "Ian",
      },

      lastName: {
        type: "string",
        example: "Mena",
      },

      email: {
        type: "string",
        format: "email",
      },

      phone: {
        type: "string",
      },

      cedula: {
        type: "string",
      },
    },
  },

  UpdatePasswordDTO: {
    type: "object",

    required: ["currentPassword", "newPassword"],

    properties: {
      currentPassword: {
        type: "string",
        format: "password",
      },

      newPassword: {
        type: "string",
        format: "password",
      },
    },
  },

  UploadProfileImageDTO: {
    type: "object",

    required: ["file"],

    properties: {
      file: {
        type: "string",
        format: "binary",
      },
    },
  },

  UserResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },

  UserListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      users: {
        type: "array",

        items: {
          $ref: "#/components/schemas/User",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  UserStatusResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      message: {
        type: "string",
        example: "Estado del usuario actualizado",
      },

      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },

  ChangeUserStatusDTO: {
    type: "object",

    required: ["isActive"],

    properties: {
      isActive: {
        type: "boolean",
        example: false,
      },
    },
  },
});

// ======================================================
// CLIENTS
// ======================================================

Object.assign(swaggerSchemas, {
  Client: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      firstName: {
        type: "string",
        example: "Juan",
      },

      lastName: {
        type: "string",
        example: "Pérez",
      },

      fullName: {
        type: "string",
        example: "Juan Pérez",
      },

      cedula: {
        type: "string",
        example: "1723456789",
      },

      email: {
        type: "string",
        format: "email",
        nullable: true,
      },

      phone: {
        type: "string",
        nullable: true,
      },

      address: {
        type: "string",
        nullable: true,
      },

      notes: {
        type: "string",
        nullable: true,
      },

      userId: {
        nullable: true,
        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      isActive: {
        type: "boolean",
        example: true,
      },

      createdBy: {
        $ref: "#/components/schemas/ObjectId",
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateClientDTO: {
    type: "object",

    required: ["firstName", "lastName", "cedula", "email"],

    properties: {
      firstName: {
        type: "string",
      },

      lastName: {
        type: "string",
      },

      cedula: {
        type: "string",
      },

      email: {
        type: "string",
        format: "email",
      },

      phone: {
        type: "string",
      },

      address: {
        type: "string",
      },

      notes: {
        type: "string",
      },

      userId: {
        type: "string",
      },
    },
  },

  UpdateClientDTO: {
    type: "object",

    properties: {
      firstName: {
        type: "string",
      },

      lastName: {
        type: "string",
      },

      cedula: {
        type: "string",
      },

      email: {
        type: "string",
        format: "email",
      },

      phone: {
        type: "string",
      },

      address: {
        type: "string",
      },

      notes: {
        type: "string",
      },

      userId: {
        type: "string",
      },

      isActive: {
        type: "boolean",
      },
    },
  },

  GetClientsQueryDTO: {
    type: "object",

    properties: {
      search: {
        type: "string",
        example: "juan",
      },

      page: {
        type: "number",
        example: 1,
      },

      limit: {
        type: "number",
        example: 10,
      },

      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },

  ClientResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      client: {
        $ref: "#/components/schemas/Client",
      },
    },
  },

  ClientListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      clients: {
        type: "array",

        items: {
          $ref: "#/components/schemas/Client",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
});
// ======================================================
// CASES
// ======================================================

Object.assign(swaggerSchemas, {
  FinancialSummary: {
    type: "object",

    properties: {
      totalCost: {
        type: "number",
        example: 5000,
      },

      totalPaid: {
        type: "number",
        example: 2500,
      },

      pendingAmount: {
        type: "number",
        example: 2500,
      },

      expenses: {
        type: "number",
        example: 1200,
      },
    },
  },

  Case: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      code: {
        type: "string",
        example: "CASE-2025-001",
      },

      title: {
        type: "string",
        example: "Proceso laboral",
      },

      description: {
        type: "string",
        nullable: true,
      },

      type: {
        type: "string",
        nullable: true,
        example: "laboral",
      },

      clientId: {
        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      createdBy: {
        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      principalLawyerId: {
        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      assignedUsers: {
        type: "array",

        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },

      status: {
        $ref: "#/components/schemas/CaseStatus",
      },

      priority: {
        type: "string",
        nullable: true,
        example: "high",
      },

      startDate: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      estimatedEndDate: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      completedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      currentStageId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      tags: {
        type: "array",

        items: {
          type: "string",
        },

        example: ["urgente", "laboral"],
      },

      financialSummary: {
        $ref: "#/components/schemas/FinancialSummary",
      },

      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      deletedBy: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateCaseDTO: {
    type: "object",

    required: ["code", "title", "clientId", "principalLawyerId", "createdBy"],

    properties: {
      code: {
        type: "string",
        example: "CASE-2025-001",
      },

      title: {
        type: "string",
        example: "Proceso laboral",
      },

      description: {
        type: "string",
      },

      type: {
        type: "string",
        example: "laboral",
      },

      clientId: {
        type: "string",
      },

      principalLawyerId: {
        type: "string",
      },

      assignedUsers: {
        type: "array",

        items: {
          type: "string",
        },
      },

      priority: {
        type: "string",
        example: "high",
      },

      startDate: {
        type: "string",
        format: "date-time",
      },

      estimatedEndDate: {
        type: "string",
        format: "date-time",
      },

      tags: {
        type: "array",

        items: {
          type: "string",
        },
      },

      createdBy: {
        type: "string",
      },
    },
  },

  UpdateCaseDTO: {
    type: "object",

    properties: {
      title: {
        type: "string",
      },

      description: {
        type: "string",
      },

      type: {
        type: "string",
      },

      principalLawyerId: {
        type: "string",
      },

      assignedUsers: {
        type: "array",

        items: {
          type: "string",
        },
      },

      status: {
        $ref: "#/components/schemas/CaseStatus",
      },

      priority: {
        type: "string",
      },

      estimatedEndDate: {
        type: "string",
        format: "date-time",
      },

      completedAt: {
        type: "string",
        format: "date-time",
      },

      currentStageId: {
        type: "string",
      },

      tags: {
        type: "array",

        items: {
          type: "string",
        },
      },
    },
  },

  GetCasesDTO: {
    type: "object",

    properties: {
      status: {
        $ref: "#/components/schemas/CaseStatus",
      },

      clientId: {
        type: "string",
      },

      principalLawyerId: {
        type: "string",
      },

      priority: {
        type: "string",
        example: "high",
      },

      search: {
        type: "string",
        example: "laboral",
      },

      page: {
        type: "number",
        example: 1,
      },

      limit: {
        type: "number",
        example: 10,
      },
    },
  },

  CaseResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      case: {
        $ref: "#/components/schemas/Case",
      },
    },
  },

  CaseListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      cases: {
        type: "array",

        items: {
          $ref: "#/components/schemas/Case",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  CaseFinancialSummaryResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      financialSummary: {
        $ref: "#/components/schemas/FinancialSummary",
      },
    },
  },

  AssignUsersToCaseDTO: {
    type: "object",

    required: ["assignedUsers"],

    properties: {
      assignedUsers: {
        type: "array",

        items: {
          type: "string",
        },

        example: ["681d0f8f8d7c4b0012f34abc", "681d0f8f8d7c4b0012f34abd"],
      },
    },
  },

  UpdateCaseStatusDTO: {
    type: "object",

    required: ["status"],

    properties: {
      status: {
        $ref: "#/components/schemas/CaseStatus",
      },
    },
  },
});
// ======================================================
// STAGES
// ======================================================

Object.assign(swaggerSchemas, {
  CaseStage: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      caseId: {
        $ref: "#/components/schemas/ObjectId",
      },

      title: {
        type: "string",
        example: "Revisión de documentos",
      },

      description: {
        type: "string",
        nullable: true,
      },

      order: {
        type: "number",
        example: 1,
      },

      assignedTo: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      assignedBy: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      status: {
        $ref: "#/components/schemas/CaseStageStatus",
      },

      priority: {
        type: "string",
        nullable: true,
        example: "high",
      },

      estimatedDays: {
        type: "number",
        nullable: true,
        example: 5,
      },

      startedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      dueDate: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      completedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      delayReason: {
        type: "string",
        nullable: true,
      },

      dependsOn: {
        type: "array",

        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },

      isFinalStage: {
        type: "boolean",
        example: false,
      },

      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateCaseStageDTO: {
    type: "object",

    required: ["caseId", "title"],

    properties: {
      caseId: {
        type: "string",
      },

      title: {
        type: "string",
        example: "Revisión de documentos",
      },

      description: {
        type: "string",
      },

      assignedTo: {
        type: "string",
      },

      priority: {
        type: "string",
        example: "high",
      },

      estimatedDays: {
        type: "number",
        example: 5,
      },

      dueDate: {
        type: "string",
        format: "date-time",
      },

      dependsOn: {
        type: "array",

        items: {
          type: "string",
        },
      },

      isFinalStage: {
        type: "boolean",
        example: false,
      },
    },
  },

  UpdateCaseStageDTO: {
    type: "object",

    properties: {
      title: {
        type: "string",
      },

      description: {
        type: "string",
      },

      assignedTo: {
        type: "string",
      },

      priority: {
        type: "string",
      },

      estimatedDays: {
        type: "number",
      },

      dueDate: {
        type: "string",
        format: "date-time",
      },

      dependsOn: {
        type: "array",

        items: {
          type: "string",
        },
      },

      isFinalStage: {
        type: "boolean",
      },
    },
  },

  UpdateCaseStageStatusDTO: {
    type: "object",

    required: ["status"],

    properties: {
      status: {
        $ref: "#/components/schemas/CaseStageStatus",
      },

      delayReason: {
        type: "string",
        nullable: true,
      },
    },
  },

  AssignCaseStageDTO: {
    type: "object",

    required: ["assignedTo"],

    properties: {
      assignedTo: {
        type: "string",
        example: "681d0f8f8d7c4b0012f34abc",
      },
    },
  },

  ReorderCaseStageDTO: {
    type: "object",

    required: ["order"],

    properties: {
      order: {
        type: "number",
        example: 2,
      },
    },
  },

  CaseStageResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      stage: {
        $ref: "#/components/schemas/CaseStage",
      },
    },
  },

  CaseStageListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      stages: {
        type: "array",

        items: {
          $ref: "#/components/schemas/CaseStage",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  StageStatusResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      message: {
        type: "string",
        example: "Estado de etapa actualizado",
      },

      stage: {
        $ref: "#/components/schemas/CaseStage",
      },
    },
  },

  AssignStageResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      message: {
        type: "string",
        example: "Etapa asignada correctamente",
      },

      stage: {
        $ref: "#/components/schemas/CaseStage",
      },
    },
  },

  ReorderStageResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      message: {
        type: "string",
        example: "Orden de etapa actualizado",
      },

      stage: {
        $ref: "#/components/schemas/CaseStage",
      },
    },
  },
});
// ======================================================
// DOCUMENTS
// ======================================================

Object.assign(swaggerSchemas, {
  Document: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      caseId: {
        $ref: "#/components/schemas/ObjectId",
      },

      uploadedBy: {
        $ref: "#/components/schemas/ObjectId",
      },

      stageId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      name: {
        type: "string",
        example: "Contrato firmado",
      },

      originalName: {
        type: "string",
        example: "contrato.pdf",
      },

      mimeType: {
        type: "string",
        example: "application/pdf",
      },

      size: {
        type: "number",
        example: 1500000,
      },

      file: {
        type: "string",
        format: "binary",
      },

      visibility: {
        type: "string",
        example: "internal",
      },

      documentType: {
        type: "string",
        nullable: true,
        example: "contract",
      },

      tags: {
        type: "array",

        items: {
          type: "string",
        },

        example: ["contrato", "firmado"],
      },

      version: {
        type: "number",
        example: 1,
      },

      uploadedAt: {
        type: "string",
        format: "date-time",
      },

      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateDocumentDTO: {
    type: "object",

    required: ["caseId", "name", "originalName", "mimeType", "size", "file"],

    properties: {
      caseId: {
        type: "string",
      },

      stageId: {
        type: "string",
      },

      name: {
        type: "string",
        example: "Contrato firmado",
      },

      originalName: {
        type: "string",
        example: "contrato.pdf",
      },

      mimeType: {
        type: "string",
        example: "application/pdf",
      },

      size: {
        type: "number",
        example: 1500000,
      },

      file: {
        type: "string",
        format: "binary",
      },

      visibility: {
        type: "string",
        example: "internal",
      },

      documentType: {
        type: "string",
        example: "contract",
      },

      tags: {
        type: "array",

        items: {
          type: "string",
        },
      },
    },
  },

  UpdateDocumentDTO: {
    type: "object",

    properties: {
      name: {
        type: "string",
      },

      visibility: {
        type: "string",
      },

      documentType: {
        type: "string",
      },

      tags: {
        type: "array",

        items: {
          type: "string",
        },
      },

      version: {
        type: "number",
      },
    },
  },

  UploadDocumentRequest: {
    type: "object",

    required: ["caseId", "file"],

    properties: {
      caseId: {
        type: "string",
      },

      stageId: {
        type: "string",
      },

      name: {
        type: "string",
      },

      visibility: {
        type: "string",
        example: "internal",
      },

      documentType: {
        type: "string",
        example: "contract",
      },

      tags: {
        type: "array",

        items: {
          type: "string",
        },
      },

      file: {
        type: "string",
        format: "binary",
      },
    },
  },

  DocumentResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      document: {
        $ref: "#/components/schemas/Document",
      },
    },
  },

  DocumentListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      documents: {
        type: "array",

        items: {
          $ref: "#/components/schemas/Document",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  DocumentDownloadResponse: {
    type: "string",
    format: "binary",
  },

  DocumentPreviewResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      url: {
        type: "string",
        example: "/documents/681d0f8f8d7c4b0012f34abc/preview",
      },
    },
  },
});

// ======================================================
// NOTES
// ======================================================

Object.assign(swaggerSchemas, {
  Note: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      caseId: {
        $ref: "#/components/schemas/ObjectId",
      },

      stageId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      userId: {
        $ref: "#/components/schemas/ObjectId",
      },

      content: {
        type: "string",
        example: "El cliente entregó documentación adicional.",
      },

      visibleToClient: {
        type: "boolean",
        example: false,
      },

      attachments: {
        type: "array",

        items: {
          type: "string",
        },

        example: ["file1.pdf", "file2.png"],
      },

      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateNoteDTO: {
    type: "object",

    required: ["caseId", "content"],

    properties: {
      caseId: {
        type: "string",
      },

      stageId: {
        type: "string",
      },

      content: {
        type: "string",
        example: "El cliente entregó documentación adicional.",
      },

      visibleToClient: {
        type: "boolean",
        example: false,
      },

      attachments: {
        type: "array",

        items: {
          type: "string",
        },
      },
    },
  },

  UpdateNoteDTO: {
    type: "object",

    properties: {
      content: {
        type: "string",
      },

      visibleToClient: {
        type: "boolean",
      },

      attachments: {
        type: "array",

        items: {
          type: "string",
        },
      },
    },
  },

  GetNotesQueryDTO: {
    type: "object",

    properties: {
      caseId: {
        type: "string",
      },

      stageId: {
        type: "string",
      },

      visibleToClient: {
        type: "boolean",
      },

      page: {
        type: "number",
        example: 1,
      },

      limit: {
        type: "number",
        example: 10,
      },
    },
  },

  NoteResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      note: {
        $ref: "#/components/schemas/Note",
      },
    },
  },

  NoteListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      notes: {
        type: "array",

        items: {
          $ref: "#/components/schemas/Note",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
});

// ======================================================
// NOTIFICATIONS
// ======================================================

Object.assign(swaggerSchemas, {
  Notification: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      userId: {
        $ref: "#/components/schemas/ObjectId",
      },

      title: {
        type: "string",
        example: "Nueva etapa asignada",
      },

      message: {
        type: "string",
        example: "Se te ha asignado una nueva etapa en el caso.",
      },

      type: {
        type: "string",
        example: "stage_assigned",
      },

      priority: {
        $ref: "#/components/schemas/NotificationPriority",
      },

      isRead: {
        type: "boolean",
        example: false,
      },

      readAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      actionUrl: {
        type: "string",
        nullable: true,
        example: "/cases/123/stages/456",
      },

      entityType: {
        type: "string",
        nullable: true,
        example: "CaseStage",
      },

      entityId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      relatedCaseId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      relatedStageId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      metadata: {
        type: "object",
        additionalProperties: true,
      },

      expiresAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateNotificationDTO: {
    type: "object",

    required: ["userId", "title", "message", "type"],

    properties: {
      userId: {
        type: "string",
      },

      title: {
        type: "string",
      },

      message: {
        type: "string",
      },

      type: {
        type: "string",
        example: "stage_assigned",
      },

      priority: {
        $ref: "#/components/schemas/NotificationPriority",
      },

      actionUrl: {
        type: "string",
      },

      entityType: {
        type: "string",
      },

      entityId: {
        type: "string",
      },

      relatedCaseId: {
        type: "string",
      },

      relatedStageId: {
        type: "string",
      },

      metadata: {
        type: "object",
        additionalProperties: true,
      },

      expiresAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  UpdateNotificationDTO: {
    type: "object",

    properties: {
      title: {
        type: "string",
      },

      message: {
        type: "string",
      },

      type: {
        type: "string",
      },

      priority: {
        $ref: "#/components/schemas/NotificationPriority",
      },

      isRead: {
        type: "boolean",
      },

      readAt: {
        type: "string",
        format: "date-time",
      },

      actionUrl: {
        type: "string",
      },

      entityType: {
        type: "string",
      },

      entityId: {
        type: "string",
      },

      relatedCaseId: {
        type: "string",
      },

      relatedStageId: {
        type: "string",
      },

      metadata: {
        type: "object",
        additionalProperties: true,
      },

      expiresAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  NotificationResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      notification: {
        $ref: "#/components/schemas/Notification",
      },
    },
  },

  NotificationListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      notifications: {
        type: "array",

        items: {
          $ref: "#/components/schemas/Notification",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  MarkNotificationAsReadResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      message: {
        type: "string",
        example: "Notificación marcada como leída",
      },

      notification: {
        $ref: "#/components/schemas/Notification",
      },
    },
  },

  MarkAllNotificationsAsReadResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      message: {
        type: "string",
        example: "Todas las notificaciones fueron marcadas como leídas",
      },
    },
  },
});

// ======================================================
// ACTIVITIES
// ======================================================

Object.assign(swaggerSchemas, {
  Activity: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      userId: {
        $ref: "#/components/schemas/ObjectId",
      },

      caseId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      stageId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      action: {
        $ref: "#/components/schemas/ActivityAction",
      },

      description: {
        type: "string",
        nullable: true,
        example: "El usuario creó un nuevo caso.",
      },

      metadata: {
        type: "object",
        additionalProperties: true,
      },

      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateActivityDTO: {
    type: "object",

    required: ["userId", "action"],

    properties: {
      userId: {
        type: "string",
      },

      caseId: {
        type: "string",
      },

      stageId: {
        type: "string",
      },

      action: {
        $ref: "#/components/schemas/ActivityAction",
      },

      description: {
        type: "string",
      },

      metadata: {
        type: "object",
        additionalProperties: true,
      },
    },
  },

  ActivityResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      activity: {
        $ref: "#/components/schemas/Activity",
      },
    },
  },

  ActivityListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      activities: {
        type: "array",

        items: {
          $ref: "#/components/schemas/Activity",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
});

// ======================================================
// PAYMENTS
// ======================================================

Object.assign(swaggerSchemas, {
  CasePayment: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      caseId: {
        $ref: "#/components/schemas/ObjectId",
      },

      amount: {
        type: "number",
        example: 1500,
      },

      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      category: {
        type: "string",
        example: "Honorarios",
      },

      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      status: {
        $ref: "#/components/schemas/PaymentStatus",
      },

      description: {
        type: "string",
        nullable: true,
      },

      reference: {
        type: "string",
        nullable: true,
        example: "TRX-001",
      },

      attachments: {
        type: "array",

        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },

      paymentDate: {
        type: "string",
        format: "date-time",
      },

      registeredBy: {
        $ref: "#/components/schemas/ObjectId",
      },

      updatedBy: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      deletedBy: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      affectsGlobalFinance: {
        type: "boolean",
        example: true,
      },

      financeTransactionId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateCasePaymentDTO: {
    type: "object",

    required: ["caseId", "amount", "type", "category", "method"],

    properties: {
      caseId: {
        type: "string",
      },

      amount: {
        type: "number",
        example: 1500,
      },

      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      category: {
        type: "string",
        example: "Honorarios",
      },

      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      description: {
        type: "string",
      },

      reference: {
        type: "string",
      },

      attachments: {
        type: "array",

        items: {
          type: "string",
        },
      },

      paymentDate: {
        type: "string",
        format: "date-time",
      },

      affectsGlobalFinance: {
        type: "boolean",
      },
    },
  },

  UpdateCasePaymentDTO: {
    type: "object",

    properties: {
      amount: {
        type: "number",
      },

      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      category: {
        type: "string",
      },

      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      status: {
        $ref: "#/components/schemas/PaymentStatus",
      },

      description: {
        type: "string",
      },

      reference: {
        type: "string",
      },

      attachments: {
        type: "array",

        items: {
          type: "string",
        },
      },

      paymentDate: {
        type: "string",
        format: "date-time",
      },

      affectsGlobalFinance: {
        type: "boolean",
      },
    },
  },

  CasePaymentResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      payment: {
        $ref: "#/components/schemas/CasePayment",
      },
    },
  },

  CasePaymentListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      payments: {
        type: "array",

        items: {
          $ref: "#/components/schemas/CasePayment",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },
});

// ======================================================
// FINANCE
// ======================================================

Object.assign(swaggerSchemas, {
  FinanceTransaction: {
    type: "object",

    properties: {
      _id: {
        $ref: "#/components/schemas/ObjectId",
      },

      title: {
        type: "string",
        example: "Pago de honorarios",
      },

      description: {
        type: "string",
        nullable: true,
      },

      amount: {
        type: "number",
        example: 1200,
      },

      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      category: {
        type: "string",
        example: "Honorarios",
      },

      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      status: {
        $ref: "#/components/schemas/PaymentStatus",
      },

      reference: {
        type: "string",
        nullable: true,
      },

      attachments: {
        type: "array",

        items: {
          $ref: "#/components/schemas/ObjectId",
        },
      },

      transactionDate: {
        type: "string",
        format: "date-time",
      },

      registeredBy: {
        $ref: "#/components/schemas/ObjectId",
      },

      updatedBy: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      deletedBy: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      relatedCaseId: {
        nullable: true,

        allOf: [
          {
            $ref: "#/components/schemas/ObjectId",
          },
        ],
      },

      sourceType: {
        $ref: "#/components/schemas/FinanceSourceType",
      },

      isDeleted: {
        type: "boolean",
        example: false,
      },

      deletedAt: {
        type: "string",
        format: "date-time",
        nullable: true,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CreateFinanceTransactionDTO: {
    type: "object",

    required: ["title", "amount", "type", "category"],

    properties: {
      title: {
        type: "string",
        example: "Pago de honorarios",
      },

      description: {
        type: "string",
      },

      amount: {
        type: "number",
      },

      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      category: {
        type: "string",
      },

      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      reference: {
        type: "string",
      },

      attachments: {
        type: "array",

        items: {
          type: "string",
        },
      },

      transactionDate: {
        type: "string",
        format: "date-time",
      },

      relatedCaseId: {
        type: "string",
      },
    },
  },

  UpdateFinanceTransactionDTO: {
    type: "object",

    properties: {
      title: {
        type: "string",
      },

      description: {
        type: "string",
      },

      amount: {
        type: "number",
      },

      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      category: {
        type: "string",
      },

      method: {
        $ref: "#/components/schemas/PaymentMethod",
      },

      status: {
        $ref: "#/components/schemas/PaymentStatus",
      },

      reference: {
        type: "string",
      },

      attachments: {
        type: "array",

        items: {
          type: "string",
        },
      },

      transactionDate: {
        type: "string",
        format: "date-time",
      },
    },
  },

  FinanceTransactionResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      transaction: {
        $ref: "#/components/schemas/FinanceTransaction",
      },
    },
  },

  FinanceTransactionListResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      transactions: {
        type: "array",

        items: {
          $ref: "#/components/schemas/FinanceTransaction",
        },
      },

      pagination: {
        $ref: "#/components/schemas/PaginationMeta",
      },
    },
  },

  FinanceSummaryResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
      },

      summary: {
        type: "object",

        properties: {
          totalIncome: {
            type: "number",
            example: 10000,
          },

          totalExpenses: {
            type: "number",
            example: 4000,
          },

          balance: {
            type: "number",
            example: 6000,
          },
        },
      },
    },
  },
});
// ======================================================
// GENERIC RESPONSES
// ======================================================

Object.assign(swaggerSchemas, {
  UnauthorizedResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: false,
      },

      message: {
        type: "string",
        example: "No autorizado",
      },
    },
  },

  ForbiddenResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: false,
      },

      message: {
        type: "string",
        example: "No tienes permisos para realizar esta acción",
      },
    },
  },

  NotFoundResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: false,
      },

      message: {
        type: "string",
        example: "Recurso no encontrado",
      },
    },
  },

  ConflictResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: false,
      },

      message: {
        type: "string",
        example: "El recurso ya existe",
      },
    },
  },

  InternalServerErrorResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: false,
      },

      message: {
        type: "string",
        example: "Error interno del servidor",
      },
    },
  },

  DeleteResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      message: {
        type: "string",
        example: "Registro eliminado correctamente",
      },
    },
  },

  RestoreResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      message: {
        type: "string",
        example: "Registro restaurado correctamente",
      },
    },
  },
});

// ======================================================
// FILTER / QUERY DTOs
// ======================================================

Object.assign(swaggerSchemas, {
  PaginationQueryDTO: {
    type: "object",

    properties: {
      page: {
        type: "number",
        example: 1,
      },

      limit: {
        type: "number",
        example: 10,
      },
    },
  },

  SearchQueryDTO: {
    type: "object",

    properties: {
      search: {
        type: "string",
        example: "laboral",
      },
    },
  },

  DateRangeQueryDTO: {
    type: "object",

    properties: {
      startDate: {
        type: "string",
        format: "date-time",
      },

      endDate: {
        type: "string",
        format: "date-time",
      },
    },
  },

  CasePaymentQueryDTO: {
    type: "object",

    properties: {
      caseId: {
        type: "string",
      },

      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      status: {
        $ref: "#/components/schemas/PaymentStatus",
      },

      category: {
        type: "string",
      },

      page: {
        type: "number",
      },

      limit: {
        type: "number",
      },
    },
  },

  FinanceTransactionQueryDTO: {
    type: "object",

    properties: {
      type: {
        $ref: "#/components/schemas/PaymentType",
      },

      status: {
        $ref: "#/components/schemas/PaymentStatus",
      },

      category: {
        type: "string",
      },

      relatedCaseId: {
        type: "string",
      },

      page: {
        type: "number",
      },

      limit: {
        type: "number",
      },
    },
  },

  NotificationQueryDTO: {
    type: "object",

    properties: {
      isRead: {
        type: "boolean",
      },

      priority: {
        $ref: "#/components/schemas/NotificationPriority",
      },

      page: {
        type: "number",
      },

      limit: {
        type: "number",
      },
    },
  },

  ActivityQueryDTO: {
    type: "object",

    properties: {
      userId: {
        type: "string",
      },

      caseId: {
        type: "string",
      },

      action: {
        $ref: "#/components/schemas/ActivityAction",
      },

      page: {
        type: "number",
      },

      limit: {
        type: "number",
      },
    },
  },

  DocumentQueryDTO: {
    type: "object",

    properties: {
      caseId: {
        type: "string",
      },

      stageId: {
        type: "string",
      },

      visibility: {
        type: "string",
        example: "internal",
      },

      documentType: {
        type: "string",
      },

      page: {
        type: "number",
      },

      limit: {
        type: "number",
      },
    },
  },

  StageQueryDTO: {
    type: "object",

    properties: {
      caseId: {
        type: "string",
      },

      assignedTo: {
        type: "string",
      },

      status: {
        $ref: "#/components/schemas/CaseStageStatus",
      },

      page: {
        type: "number",
      },

      limit: {
        type: "number",
      },
    },
  },
});

// ======================================================
// FILE / MULTIPART
// ======================================================

Object.assign(swaggerSchemas, {
  MultipartFile: {
    type: "string",
    format: "binary",
  },

  UploadSingleFileDTO: {
    type: "object",

    required: ["file"],

    properties: {
      file: {
        type: "string",
        format: "binary",
      },
    },
  },

  UploadMultipleFilesDTO: {
    type: "object",

    required: ["files"],

    properties: {
      files: {
        type: "array",

        items: {
          type: "string",
          format: "binary",
        },
      },
    },
  },
});

// ======================================================
// SYSTEM / HEALTH
// ======================================================

Object.assign(swaggerSchemas, {
  HealthResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      status: {
        type: "string",
        example: "ok",
      },

      uptime: {
        type: "number",
        example: 1200,
      },

      timestamp: {
        type: "string",
        format: "date-time",
      },
    },
  },
});

// ======================================================
// EXPORT DEFAULT
// ======================================================

export default swaggerSchemas;
