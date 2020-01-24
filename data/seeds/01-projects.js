exports.seed = function(knex) {
    return knex('projects').insert([
        {
            project_name : 'project 1',
            project_description : 'project description 1',
            project_completed : false
        },
        {
            project_name : 'project 2',
            project_description : 'project description 2',
            project_completed : false
        },
        {
            project_name : 'project 3',
            project_description : 'project description 3',
            project_completed : false
        }
    ])
};