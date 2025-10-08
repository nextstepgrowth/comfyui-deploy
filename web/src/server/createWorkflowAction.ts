"use server";

import { createNewWorkflow } from "./createNewWorkflow";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createWorkflowAction(formData: FormData) {
  const { userId, orgId } = auth();

  if (!userId) {
    throw new Error("인증이 필요합니다.");
  }

  const workflowName = formData.get("workflow_name") as string;
  const workflowJsonStr = formData.get("workflow_json") as string;
  const workflowApiJsonStr = formData.get("workflow_api_json") as string;

  if (!workflowName?.trim()) {
    throw new Error("워크플로우 이름을 입력해주세요.");
  }

  let parsedWorkflow;
  try {
    parsedWorkflow = workflowJsonStr?.trim() ? JSON.parse(workflowJsonStr) : {};
  } catch (error) {
    throw new Error("올바른 JSON 형식이 아닙니다.");
  }

  let parsedWorkflowApi;
  try {
    parsedWorkflowApi = workflowApiJsonStr?.trim()
      ? JSON.parse(workflowApiJsonStr)
      : {};
  } catch (error) {
    throw new Error("올바른 JSON 형식이 아닙니다.");
  }

  const result = await createNewWorkflow({
    user_id: userId,
    org_id: orgId,
    workflow_name: workflowName,
    workflowData: {
      workflow: parsedWorkflow,
      workflow_api: parsedWorkflowApi,
      snapshot: null,
    },
  });

  // 워크플로우 목록 페이지를 리프레시
  revalidatePath("/workflows");

  // 새로 생성된 워크플로우 페이지로 리다이렉트
  redirect(`/workflows/${result.workflow_id}`);
}
