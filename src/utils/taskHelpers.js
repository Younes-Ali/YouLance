import { Bell, CheckCircle, Coffee, Flag } from 'lucide-react';

export const TASK_TYPES = {
    meeting:  { label: "Meeting",  icon: Coffee,       color: "bg-blue-500",   text: "text-blue-500",   light: "bg-blue-50 border-blue-200"   },
    deadline: { label: "Deadline", icon: Flag,         color: "bg-red-500",    text: "text-red-500",    light: "bg-red-50 border-red-200"     },
    reminder: { label: "Reminder", icon: Bell,         color: "bg-amber-500",  text: "text-amber-500",  light: "bg-amber-50 border-amber-200" },
    task:     { label: "Task",     icon: CheckCircle,  color: "bg-indigo-500", text: "text-indigo-500", light: "bg-indigo-50 border-indigo-200"},
};

export const tasksForDate = (tasks, dateStr) =>
    tasks.filter(t => (t.attributes || t).date === dateStr);