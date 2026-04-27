
const AllTasks = () => {
    return (
        <>
            <section>
                <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: 'var(--color-muted)' }}>
                    <h1>All Tasks</h1>
                    <div>
                        <button className="primary-btn flex items-center gap-2">
                            <span>+</span>
                            <span>Add task</span>
                        </button>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-2 my-2">
                    <div className="primary-card">
                        <span className="card-title text-(--color-muted) text-sm">Total</span>
                        <span className="text-[1.5rem]">5</span>
                    </div>
                    <div className="primary-card">
                        <span className="card-title text-(--color-muted) text-sm">Active</span>
                        <span className="text-[1.5rem]">3</span>
                    </div>
                    <div className="primary-card">
                        <span className="card-title text-(--color-muted) text-sm">Done</span>
                        <span className="text-[1.5rem]">2</span>
                    </div>
                </div>
            </section>

        </>
    );
};

export default AllTasks;