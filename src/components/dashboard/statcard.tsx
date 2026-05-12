type StatCardProps = {
    title: string;
    value: string;
};
export default function StatCard({
    title,
    value,
}: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <p className="text-sm text-zinc-500">
                {title}
            </p>
            <h2 className="text-3xl font-bold text-zinc-800 mt-3">
                {value}
            </h2>
        </div>
    )
}