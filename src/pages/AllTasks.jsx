import { useState } from "react";
import useTaskStore from '../store/taskStore'
import ProgressBar from '../components/ui/ProgressBar';
import FilterBar from "../components/FilterBar/FilterBar";
import TaskList from "../components/TaskList/TaskList";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";

const FILTERS = ['ALL', 'ACTIVE', 'DONE', 'WORK', 'HEALTH', 'PERSONAL']

const AllTasks = () => {
    const tasks = useTaskStore((s) => s.tasks)
    const [filter, setFilter] = useState('all')

    const doneTasks = tasks.filter(t => t.done)
    const activeTasks = tasks.filter(t => !t.done)

    function getVisibleTasks() {
        if (filter === 'ACTIVE') return activeTasks
        if (filter === 'DONE') return doneTasks
        if (['WORK', 'HEALTH', 'PERSONAL'].includes(filter))
            return tasks.filter(t => t.label === filter)
        return tasks
    }
    const visibleTasks = getVisibleTasks()

    return (
        <section>
            <div className="border-b pb-4 border-(--color-border)">
                <h1>All Tasks</h1>
              
            </div>

            <div className="grid md:grid-cols-3 gap-2 my-2">
                <div className="primary-card">
                    <span className="text-(--color-muted) text-sm">Total</span>
                    <span className="text-[1.5rem]">5</span>
                </div>
                <div className="primary-card">
                    <span className="text-(--color-muted) text-sm">Active</span>
                    <span className="text-[1.5rem]">3</span>
                </div>
                <div className="primary-card">
                    <span className="text-(--color-muted) text-sm">Done</span>
                    <span className="text-[1.5rem]">2</span>
                </div>
            </div>

            <AddTaskForm />

            <ProgressBar total={tasks.length} done={doneTasks.length} />

            <FilterBar filters={FILTERS} activeTasks={filter} onFilterChange={setFilter} />

            <TaskList tasks={visibleTasks} />
        </section>
    );
};

export default AllTasks;