import axios from 'axios';
import { Users } from 'lucide-react'
import toast from 'react-hot-toast';
import ClientCard from './ClientCard';
import useAppStore from '../../store/storeClients';
import { glass } from '../../../public/styles/PublicStyles';

const API = "http://localhost:1337/api";
const auth = () => {
    const t = localStorage.getItem("token") || sessionStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${t}` } };
};

export default function GridClient() {

    const loading = useAppStore((state) => state.loading);
    const setModal = useAppStore((state) => state.setModal);
    const clients = useAppStore((state) => state.clients);
    const search = useAppStore((state) => state.search);
    const setClients = useAppStore((state) => state.setClients);
    const setLoading = useAppStore((state) => state.setLoading);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/clients?sort=name:asc&pagination[limit]=100`, auth());
            setClients(res.data.data || []);
        } catch { toast.error("Failed to load clients"); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm("Remove this client?")) return;
        try {
            await axios.delete(`${API}/clients/${id}`, auth());
            toast.success("Client removed");
            fetchClients();
        } catch { toast.error("Delete failed"); }
    };

    

    const filtered = clients.filter(c => {
        const attrs = c.attributes || c;
        const q = search.toLowerCase();
        return (
            (attrs.name || "").toLowerCase().includes(q) ||
            (attrs.email || "").toLowerCase().includes(q) ||
            (attrs.company || "").toLowerCase().includes(q)
        );
    });
    return (
        <>
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-44 bg-black/10 dark:bg-white/5 rounded-2xl animate-pulse" />)}
                </div>
            ) : filtered.length === 0 ? (
                <div className={`${glass} rounded-2xl p-16 text-center`}>
                    <Users size={40} className="text-black/50 dark:text-white/15 mx-auto mb-3" />
                    <p className="text-black/75 dark:text-white/35 text-sm">No clients found</p>
                    <button onClick={() => setModal({ open: true, client: null })}
                        className="mt-4 text-violet-400 text-sm hover:text-violet-300 transition-colors">
                        Add your first client →
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((c, i) => (
                        <ClientCard key={c.id} client={c} colorIdx={i}
                            onEdit={(cl) => setModal({ open: true, client: cl })}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </>
    )
}
