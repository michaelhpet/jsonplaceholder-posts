import Button from "@/components/button";
import Input from "@/components/input";
import TextArea from "@/components/textarea";
import { useForm, useNotify } from "@/utils/hooks";
import { ArticleType, CreateArticleResponse } from "@/utils/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormData = Omit<ArticleType, "_id" | "excerpt" | "timestamp">;

export default function CreateArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { errors, handleSubmit, clearError } = useForm<FormData>();
  const notify = useNotify();

  const submit = async (data: FormData) => {
    setLoading(true);
    const res: CreateArticleResponse = await (
      await fetch(`${import.meta.env.VITE_APP_API_URL}/articles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    ).json();
    setLoading(false);
    if (["fail", "error"].includes(res.status))
      return notify.error(res.message);
    notify.success(res.message);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-0 md:gap-x-3"
    >
      <div className="col-span-2 flex items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <h1 className="text-xl font-bold">Create Article</h1>
        </div>
        <Button loading={loading}>Submit</Button>
      </div>

      <Input
        id="author_name"
        name="author_name"
        label="Author Name"
        placeholder="Enter author name"
        rootClassName="col-span-full md:col-span-1"
        error={errors["author_name"]}
        onChange={() => clearError("author_name")}
      />

      <Input
        id="author_email"
        name="author_email"
        label="Author Email"
        placeholder="Enter author email"
        rootClassName="col-span-full md:col-span-1"
        error={errors["author_email"]}
        onChange={() => clearError("author_email")}
      />

      <Input
        id="title"
        name="title"
        label="Article Title"
        placeholder="Enter article title"
        rootClassName="col-span-2"
        error={errors["title"]}
        onChange={() => clearError("title")}
      />

      <TextArea
        rows={15}
        id="body"
        name="body"
        label="Article Body"
        placeholder="Enter article body"
        rootClassName="col-span-2"
        error={errors["body"]}
        onChange={() => clearError("body")}
      />
    </form>
  );
}
