import useUser from "../../hooks/useGetUser";


export default function Greeting() {
    const { user } = useUser();
  return (
    <div className="mb-6">
        <h2 className="text-black dark:text-white/90 text-2xl font-black tracking-tight">
          Hi, {user ? user.username.split(" ")[0].charAt(0).toUpperCase() + user.username.split(" ")[0].slice(1) : "User"} 👋
        </h2>
        <p className="text-black/60 dark:text-white/35 text-sm mt-1">Here's what's happening with your freelance business today.</p>
      </div>
  )
}
