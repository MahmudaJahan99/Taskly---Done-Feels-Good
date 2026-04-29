import useTaskStore from '../store/taskStore'
import ProgressBar from '../components/ui/ProgressBar';
import FilterBar from "../components/FilterBar/FilterBar";
import TaskList from "../components/TaskList/TaskList";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import { LABEL_COLORS } from '../constants/labels';
import { useMemo } from 'react';

const BASE_FILTERS = ["all", "active", "done"];
const LABEL_FILTERS = LABEL_COLORS.map((l) => l.name);
const FILTERS = [...BASE_FILTERS, ...LABEL_FILTERS];

const AllTasks = () => {
    const tasks = useTaskStore((s) => s.tasks)
    const filter = useTaskStore((s) => s.filter)

    const { activeTasks, doneTasks, visibleTasks } = useMemo(() => {
        const activeTasks = [];
        const doneTasks = [];

        for (const task of tasks) {
            (task.done ? doneTasks : activeTasks).push(task);
        }

        let visibleTasks = tasks;

        if (filter === "active") {
            visibleTasks = activeTasks;
        } else if (filter === "done") {
            visibleTasks = doneTasks;
        } else if (LABEL_FILTERS.includes(filter)) {
            visibleTasks = tasks.filter((t) => t.label === filter);
        }

        return { activeTasks, doneTasks, visibleTasks };
    }, [tasks, filter]);

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