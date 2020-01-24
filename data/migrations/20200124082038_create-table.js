
exports.up = function(knex) {
  
    /*
    projects
    - id integer
    - project_name varchar 255
    - project_description varchar 255
    - project_completed boolean false


    resources
    - id integer
    - resource_name varchar 255
    - resource_description

    tasks
    - id integer
    - task_descriptions varchar 255
    - task_notes varchar 255
    - task_completed boolean
    - project_id integer

    projects_resources
    - project_id integer
    - resource_id integer
    */

    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.text('project_name', 255)
                .unique()
                .notNullable();
            tbl.text('project_description', 255)
                .notNullable();
            tbl.boolean('project_completed')
                .notNullable()
                .defaultTo(false);
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.text('resource_name', 255)
                .unique()
                .notNullable();
            tbl.text('resource_description', 255)
                .notNullable();
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.text('task_description', 255)
                .unique()
                .notNullable();
            tbl.text('task_notes', 255)
                .notNullable();
            tbl.boolean('task_completed')
                .notNullable()
                .defaultTo(false);
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('projects_resources', tbl => {
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })


    // make sure this matches the mvp(matches and has everything required)


};

exports.down = function(knex) {


        // opposide order they were added in and make sure link tables go first
        return knex.schema
            .dropTableIfExists('projects_resources')
            .dropTableIfExists('tasks')
            .dropTableIfExists('resources')
            .dropTableIfExists('projects');
};
