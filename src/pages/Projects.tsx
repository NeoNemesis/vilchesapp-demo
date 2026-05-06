import { MapPin, Users, Calendar } from 'lucide-react';
import { projects, formatCurrency, formatDate } from '../data/mockData';
import { ProjectBadge } from '../components/Badge';

const avatarColors = ['bg-purple-500', 'bg-blue-500', 'bg-orange-500'];

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return (
    <div
      className={`w-7 h-7 rounded-full ${avatarColors[index % 3]} flex items-center justify-center text-white text-xs font-semibold border-2 border-[#1c1c1c]`}
      title={name}
    >
      {initials}
    </div>
  );
}

export function Projects() {
  const active = projects.filter((p) => p.status !== 'completed');
  const done = projects.filter((p) => p.status === 'completed');

  return (
    <div className="p-8 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Projekt</h1>
          <p className="text-gray-500 text-sm">{projects.length} projekt totalt · {active.length} aktiva</p>
        </div>
        <button className="flex items-center gap-2 bg-[#4AE54A] hover:bg-[#3bc93b] text-black font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
          + Nytt projekt
        </button>
      </div>

      {/* Active projects */}
      <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Aktiva projekt</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {active.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Completed */}
      <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">Slutförda projekt</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {done.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const isComplete = project.status === 'completed';

  return (
    <div className="bg-[#1c1c1c] border border-[rgba(74,229,74,0.1)] rounded-2xl p-5 hover:border-[rgba(74,229,74,0.3)] transition-all cursor-pointer group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm leading-tight mb-1 group-hover:text-[#4AE54A] transition-colors">
            {project.name}
          </p>
          <p className="text-gray-500 text-xs">{project.customer}</p>
        </div>
        <ProjectBadge status={project.status} />
      </div>

      {/* Address */}
      <div className="flex items-center gap-1.5 text-gray-600 text-xs mb-4">
        <MapPin size={11} />
        {project.address}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-gray-500 text-xs">Framsteg</p>
          <p className={`text-sm font-bold ${isComplete ? 'text-[#4AE54A]' : 'text-white'}`}>
            {project.progress}%
          </p>
        </div>
        <div className="h-2 bg-[#2C2C2C] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${isComplete ? 'bg-[#4AE54A]' : 'bg-[#4AE54A] opacity-75'}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
        <div>
          <p className="text-[#4AE54A] font-semibold text-sm">{formatCurrency(project.value)}</p>
          <div className="flex items-center gap-1 text-gray-600 text-xs mt-0.5">
            <Calendar size={10} />
            {formatDate(project.endDate)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {project.team.map((member, i) => (
              <Avatar key={member} name={member} index={i} />
            ))}
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-xs ml-2">
            <Users size={10} />
            {project.team.length}
          </div>
        </div>
      </div>
    </div>
  );
}
