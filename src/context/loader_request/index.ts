import {
  findAllSchedules,
  findScheduleById,
  createSchedule,
  deleteSchedule,
  updateSchedule,
} from "../controllers/schedule.controller";
import { listEstablishment } from "@/context/controllers/organization.controller";
import {
  createService,
  deleteService,
  getServiceById,
  listAllServices,
  updateService,
} from "../controllers/services.controller";
import {
  createPlan,
  deletePlan,
  getPlanById,
  listAllPlans,
  listPlanByUser,
  updatePlan,
} from "../controllers/plans.controller";

const REQUESTS: Map<string, (args1?: any, args2?: any) => Promise<any>> =
  new Map();

REQUESTS.set("findAllSchedules", findAllSchedules);
REQUESTS.set("findScheduleById", findScheduleById);
REQUESTS.set("createSchedule", createSchedule);
REQUESTS.set("deleteSchedule", deleteSchedule);
REQUESTS.set("updateSchedule", updateSchedule);
REQUESTS.set("listEstablishment", listEstablishment);
REQUESTS.set("createService", createService);
REQUESTS.set("deleteService", deleteService);
REQUESTS.set("getServiceById", getServiceById);
REQUESTS.set("listAllServices", listAllServices);
REQUESTS.set("updateService", updateService);
REQUESTS.set("createPlan", createPlan);
REQUESTS.set("deletePlan", deletePlan);
REQUESTS.set("getPlanById", getPlanById);
REQUESTS.set("listAllPlans", listAllPlans);
REQUESTS.set("updatePlan", updatePlan);
REQUESTS.set("listPlanByUser", listPlanByUser);

export { REQUESTS };

export type RequestKeys =
  | "findAllSchedules"
  | "findScheduleById"
  | "createSchedule"
  | "deleteSchedule"
  | "updateSchedule"
  | "listEstablishment"
  | "createService"
  | "deleteService"
  | "getServiceById"
  | "listAllServices"
  | "updateService"
  | "createPlan"
  | "deletePlan"
  | "getPlanById"
  | "listAllPlans"
  | "updatePlan"
  | "listPlanByUser";
