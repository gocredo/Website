
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { CommentSection } from "./comment-section";
import { Plus, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: { id: string; name: string };
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
  tags: string[];
  tenantId: string;
  subtasks: { id: string; title: string; completed: boolean }[];
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (task: Partial<Task>) => void;
  tenants: { id: string; name: string }[];
  assignees: { id: string; name: string }[];
}

export function TaskModal({ isOpen, onClose, task, onSave, tenants, assignees }: TaskModalProps) {
  const [formData, setFormData] = useState<Partial<Task>>(task || { tags: [], subtasks: [] });
  const [newTag, setNewTag] = useState("");
  const [newSubtask, setNewSubtask] = useState("");

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData((prev) => ({ ...prev, tags: [...(prev.tags || []), newTag] }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags?.filter((t) => t !== tag) }));
  };

  const addSubtask = () => {
    if (newSubtask) {
      setFormData((prev) => ({
        ...prev,
        subtasks: [...(prev.subtasks || []), { id: `sub-${Date.now()}`, title: newSubtask, completed: false }],
      }));
      setNewSubtask("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label>Description</Label>
            <QuillEditor
              value={formData.description || ""}
              onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
              theme="snow"
              className="bg-gray-800 text-white"
              modules={{ toolbar: [["bold", "italic", "underline"], ["link"], [{ list: "ordered" }, { list: "bullet" }]] }}
            />
          </div>
          <div>
            <Label>Assignee</Label>
            <Select
              value={formData.assignee?.id || ""}
              onValueChange={(value) => {
                const assignee = assignees.find((a) => a.id === value);
                setFormData((prev) => ({ ...prev, assignee: assignee ? { id: assignee.id, name: assignee.name } : undefined }));
              }}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select Assignee" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                {assignees.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Priority</Label>
            <Select
              value={formData.priority || ""}
              onValueChange={(value: "LOW" | "MEDIUM" | "HIGH") => setFormData((prev) => ({ ...prev, priority: value }))}
            >
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Due Date</Label>
            <DatePicker
              selected={formData.dueDate ? new Date(formData.dueDate) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  setFormData((prev) => ({ ...prev, dueDate: date.toISOString() }));
                }
              }}
              className="w-full bg-gray-900 border-gray-700 text-white p-2 rounded-md"
            />
          </div>
          <div>
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                className="bg-gray-900 border-gray-700 text-white"
              />
              <Button onClick={addTag} className="bg-purple-500">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags?.map((tag) => (
                <Badge key={tag} className="bg-gray-700">
                  {tag}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Label>Subtasks</Label>
            <div className="flex gap-2">
              <Input
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="Add subtask"
                className="bg-gray-900 border-gray-700 text-white"
              />
              <Button onClick={addSubtask} className="bg-purple-500">Add</Button>
            </div>
            <ul className="mt-2 space-y-2">
              {formData.subtasks?.map((subtask) => (
                <li key={subtask.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        subtasks: prev.subtasks?.map((s) =>
                          s.id === subtask.id ? { ...s, completed: !s.completed } : s
                        ),
                      }))
                    }
                  />
                  <span className={subtask.completed ? "line-through text-gray-500" : "text-white"}>{subtask.title}</span>
                </li>
              ))}
            </ul>
          </div>
          {task && <CommentSection taskId={task.id} />}
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-gradient-to-r from-purple-500 to-pink-500">Save</Button>
          <Button variant="outline" className="border-gray-700 text-white" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}