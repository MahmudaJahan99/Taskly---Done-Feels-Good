import useTaskStore from '../store/taskStore'
import ProgressBar from '../components/ui/ProgressBar';
import FilterBar from "../components/FilterBar/FilterBar";
import TaskList from "../components/TaskList/TaskList";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import { LABEL_COLORS } from '../constants/labels';

const BASE_FILTERS = ["all", "active", "done"];
const LABEL_FILTERS = LABEL_COLORS.map((l) => l.name);
const FILTERS = [...BASE_FILTERS, ...LABEL_FILTERS];

const AllTasks = () => {
    const tasks = useTaskStore((s) => s.tasks)
    const filter = useTaskStore((s) => s.filter)

    const activeTasks = tasks.filter(t => !t.done)
    const doneTasks = tasks.filter(t => t.done)

    function getVisibleTasks() {
        if (filter === 'active') return activeTasks
        if (filter === 'done') return doneTasks
        if (['work', 'health', 'personal'].includes(filter))
            return tasks.filter(t => t.label === filter)
        return tasks
    }
    const visibleTasks = getVisibleTasks()

    return (
        <section>
            {/* Page title */}
            <div className="border-b pb-4 border-(--color-border)">
                <h1>All Tasks</h1>
            </div>

            {/* Tasks Card - Total, Active, & Done */}
            <div className="grid md:grid-cols-3 gap-2 my-3">
                <div className="primary-card">
                    <span className="text-(--color-muted) text-sm">Total</span>
                    <span className="text-[1.5rem]">
                        {tasks.length}
                    </span>
                </div>
                <div className="primary-card">
                    <span className="text-(--color-muted) text-sm">Active</span>
                    <span className="text-[1.5rem]">
                        {activeTasks.length}
                    </span>
                </div>
                <div className="primary-card">
                    <span className="text-(--color-muted) text-sm">Done</span>
                    <span className="text-[1.5rem]">
                        {doneTasks.length}
                    </span>
                </div>
            </div>

            {/* Add Tasks Form */}
            <AddTaskForm />

            {/* Progress Bar */}
            <ProgressBar total={tasks.length} done={doneTasks.length} />

            {/* Filter Buttons */}
            <FilterBar filters={FILTERS} />

            {/* Tasks */}
            <TaskList tasks={visibleTasks} />
        </section>
    );
};

export default AllTasks;