"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { LoadingIcon } from "@/components/LoadingIcon";
import { createWorkflowAction } from "@/server/createWorkflowAction";
import { toast } from "sonner";

export function CreateWorkflowButton() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const workflowName = formData.get("workflow_name") as string;
    const workflowJson = formData.get("workflow_json") as string;
    const workflowApiJson = formData.get("workflow_api_json") as string;

    if (!workflowName?.trim()) {
      toast.error("워크플로우 이름을 입력해주세요.");
      return;
    }

    // JSON 유효성 검사
    if (workflowJson?.trim()) {
      try {
        JSON.parse(workflowJson);
      } catch (error) {
        toast.error("workflow json이 올바른 JSON 형식이 아닙니다.");
        return;
      }
    }

    if (workflowApiJson?.trim()) {
      try {
        JSON.parse(workflowApiJson);
      } catch (error) {
        toast.error("workflow api json이 올바른 JSON 형식이 아닙니다.");
        return;
      }
    }

    setIsLoading(true);
    try {
      await createWorkflowAction(formData);
      setOpen(false);
      toast.success("워크플로우가 성공적으로 생성되었습니다!");
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "워크플로우 생성 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={16} />
          Create Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 워크플로우 생성</DialogTitle>
          <DialogDescription>
            새로운 ComfyUI 워크플로우를 생성합니다. 워크플로우 JSON은
            선택사항입니다.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="workflow-name">워크플로우 이름</Label>
              <Input
                id="workflow-name"
                name="workflow_name"
                placeholder="예: My Awesome Workflow"
                disabled={isLoading}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-json">워크플로우 JSON</Label>
              <Textarea
                id="workflow-json"
                name="workflow_json"
                placeholder='{"nodes": [], "links": [], ...}'
                rows={6}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="workflow-api-json">워크플로우 API JSON</Label>
              <Textarea
                id="workflow-api-json"
                name="workflow_api_json"
                placeholder=""
                rows={6}
                disabled={isLoading}
                className="font-mono text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading && <LoadingIcon />}
              생성
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
