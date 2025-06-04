import { redirect } from "next/navigation";
import { deleteSession } from "./delete-session";


export async function logout(){
    await deleteSession()
    redirect("/login");
}