import { useState } from "react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Send, Edit, Trash } from "lucide-react";

interface Comment {
  id: string;
  content: string;
  userId: string;
  timestamp: string;
}

interface CommentSectionProps {
  taskId: string;
}

export function CommentSection({ taskId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          id: `comment-${Date.now()}`,
          content: newComment,
          userId: "current-user",
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewComment("");
    }
  };

  const editComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, content: editContent } : c))
    );
    setEditingComment(null);
    setEditContent("");
  };

  const deleteComment = (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  return (
    <div className="space-y-4">
      <h4 className="text-white font-semibold">Comments</h4>
      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="bg-gray-900 border-gray-700 text-white"
        />
        <Button onClick={addComment} className="bg-purple-500">
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <ul className="space-y-2">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-800 p-2 rounded">
            {editingComment === comment.id ? (
              <div className="flex gap-2">
                <Input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white"
                />
                <Button onClick={() => editComment(comment.id)} className="bg-purple-500">Save</Button>
                <Button
                  variant="outline"
                  className="border-gray-700 text-white"
                  onClick={() => setEditingComment(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-white">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  {comment.userId} - {new Date(comment.timestamp).toLocaleString()}
                </p>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant="ghost"
                    className="text-gray-300"
                    onClick={() => {
                      setEditingComment(comment.id);
                      setEditContent(comment.content);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-300"
                    onClick={() => deleteComment(comment.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}