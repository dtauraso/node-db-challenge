exports.seed = function(knex) {
    return knex('tasks').insert([
        {
            task_description : 'task description 1',
            task_notes : 'task notes 1',
            task_completed : false,
            project_id : 1
        },
        {
            task_description : 'task description 2',
            task_notes : 'task notes 2',
            task_completed : false,
            project_id : 1
        },
        {
            task_description : 'task description 3',
            task_notes : 'task notes 3',
            task_completed : false,
            project_id : 2
        },
        {
            task_description : 'task description 4',
            task_notes : 'task notes 4',
            task_completed : false,
            project_id : 3
        }
    ])
};