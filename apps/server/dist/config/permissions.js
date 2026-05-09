"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS = void 0;
const roles_1 = require("@legal/shared/src/types/roles");
exports.PERMISSIONS = {
    UPDATE_USER: [roles_1.USER_ROLES.OWNER],
    CREATE_CASE: [roles_1.USER_ROLES.OWNER, roles_1.USER_ROLES.LAWYER],
    VIEW_CASE: [roles_1.USER_ROLES.OWNER, roles_1.USER_ROLES.LAWYER, roles_1.USER_ROLES.INTERN],
};
//# sourceMappingURL=permissions.js.map