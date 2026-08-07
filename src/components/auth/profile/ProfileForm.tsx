"use client";

import Input from "@/components/ui/Input";

interface Props {
  username: string;
  email?: string;
  role?: string;
  onUsernameChange: (value: string) => void;
}

export default function ProfileForm({
  username,
  email,
  role,
  onUsernameChange,
}: Props) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-zinc-800">
        Personal Information
      </h3>
      <div className="space-y-4">
        <Input
          label="Username"
          value={username}
          maxLength={30}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
        <Input
          label="Email"
          readOnly
          value={email || ""}
          className="border-zinc-200 bg-zinc-100 text-zinc-500"
        />
        <div>
          <label className="mb-1 block text-sm font-semibold text-zinc-700">
            Role
          </label>
          <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 capitalize">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
