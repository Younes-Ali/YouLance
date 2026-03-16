import RecentProjects from './RecentProjects'
import QuickActions from './QuickActions'
import useAppStore from '../../store/storeAnalytics';

export default function MainGrid() {
    const projects = useAppStore((state) => state.projects);
    const loading    = useAppStore((state) => state.loading);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">
          <RecentProjects projects={projects} loading={loading} />
        </div>
        <QuickActions />
      </div>

  )
}
