import TaskList from "../components/TaskList/TaskList";
import useTaskStore from "../store/taskStore";

const TodayTasks = () => {
    const tasks = useTaskStore((s) => s.tasks);
    // Calculate today's tasks count
    const todayStr = new Date().toLocaleDateString("en-CA");
    const todayCount = tasks.filter((task) => task.dueDate === todayStr && !task.done);

    return (
        <section>
            {/* Page header */}
            <div className="border-b pb-4 border-(--color-border)">
                <h1>Today's Tasks</h1>
            </div>

            <TaskList tasks={todayCount} />
        </section>
    );
};

export default TodayTasks;