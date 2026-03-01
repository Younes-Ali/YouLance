import { Briefcase } from "lucide-react";


export default function Footer() {
  const cols = [
    {
      heading: "Product",
      links: ["Features", "Pricing", "Changelog", "Roadmap"],
    },
    {
      heading: "Company",
      links: ["About", "Blog", "Careers", "Press"],
    },
    {
      heading: "Support",
      links: ["Help Center", "Community", "Status", "Contact"],
    },
    {
      heading: "Legal",
      links: ["Privacy", "Terms", "Cookies", "GDPR"],
    },
  ];

  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Briefcase size={15} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                You<span className="text-indigo-400">Lance</span>
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
              The complete workspace for modern freelancers.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.heading}>
              <h4 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">{c.heading}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">© 2025 FreeLance Manager. All rights reserved.</p>
          <p className="text-white/20 text-xs">Built with ❤️ for freelancers everywhere</p>
        </div>
      </div>
    </footer>
  );
}