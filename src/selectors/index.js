export const getAllTasksWithStatus = (state) => state.tasksAndStatus;

export const getTaskAndStatus = (state, taskId) => {
    const tasksWithStatus = getAllTasksWithStatus(state);

    return tasksWithStatus.find((taskAndStatus) => taskAndStatus.task.id === taskId);
};
