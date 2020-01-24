const db = require('../data/db-config.js')

module.exports = {
    getLinkTable,
    getProjects,
    getProject,
    getResources,
    getResource,
    getTasks,
    getTask,

    addResource,
    addProject,
    addTask
}


function getLinkTable() {
    return db('projects_resources')


}

function intToBool(value) {
    return value === 0? false : true
}
function convert(container, isCompleted) {

    return container.map(element => {
            return {...element,
                [isCompleted] : intToBool(element[isCompleted])}
        })
            
}
function getProjects() {
    return db
        .select('*')
        .from('projects')
        .then(projects => {
            return convert(projects, 'project_completed')
        })

}
function getProject(project_id) {
    return db
        .select('*')
        .from('projects as p')
        .where('p.id', project_id)
        .first()

}
function getResources(project_id) {
    return db('projects as p')
            .leftJoin('projects_resources as pr', 'pr.project_id', 'p.id')
            .leftJoin('resources as r', 'pr.resource_id', 'r.id')
            .where('p.id', project_id)
            .select('p.id as project id', 'r.resource_name', 'r.resource_description')

}

function getResource(resource_id) {
    return db
        .select('*')
        .from('resources as r')
        .where('r.id', resource_id)
        .first()

}
function getTasks(project_id) {
    return db('projects as p')
            .leftJoin('tasks as t', 't.project_id', 'p.id')
            .where('p.id', project_id)
            .select(
                'p.project_name',
                'p.project_description',
                't.task_description',
                't.task_notes',
                't.task_completed'
            )
            .then(tasks => {
                return convert(tasks, 'task_completed')

            })
}
function getTask(task_id) {
    return db
        .select('*')
        .from('tasks as t')
        .where('t.id', task_id)
        .first()

}

function addResource(resourceData, project_id) {
    return db('resources as r')
            .insert(resourceData)
            .then(([id]) => {
                return db('projects_resources as pr')
                        .insert({project_id: project_id, resource_id: id})
                        .then(([id2]) => {
                            return getResource(id)
                        })
            })
}

function addProject(projectData, resource_id) {
    return db('projects as p')
            .insert(projectData)
            .then(([id]) => {
                return db('projects_resources as pr')
                        .insert({project_id: id,
                                resource_id: resource_id})
                        .then(([id2]) => {
                            return getProject(id)
                        })
            })
}

function addTask(taskData, project_id) {
    return db('tasks as t')
            .insert(taskData)
            .then(([id]) => {
                return getTask(id)
            })
}