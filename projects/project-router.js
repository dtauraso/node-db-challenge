const express = require('express')

const Projects = require('./project-model.js')

const router = express.Router()


// get(read)
// works
router.get('/', (req, res) => {

    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects' });
          });
})

router.get('/linkTable', (req, res) => {

    Projects.getLinkTable()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects' });
          });
})

// works
router.get('/:id/resources', (req, res) => {

    Projects.getResources(req.params.id)
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to get resources for project ${req.params.id}` });
          });
})

// works
router.get('/:id/tasks', (req, res) => {

    Projects.getTasks(req.params.id)
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to get tasks for project ${req.params.id}` });
          });
})

router.get('/:id/afterSprintChallenge', (req, res) => {
    Projects.getProject2(req.params.id)
        .then(project => {
            // console.log(project)
            return Projects.getTasks2(req.params.id)
                    .then(tasks => {

                        console.log(tasks)
                        return Projects.getResources2(req.params.id)
                                .then(resources => {
                                    // console.log(resources)
                                    return res.status(200).json(
                                        {
                                            ...project,
                                            tasks: [...tasks],
                                            resources: [...resources]
                                        }
                                    )
                                })
                                .catch(err => {
                                    res.status(500).json({ message: `Failed to get resources for project ${req.params.id}` });
                                })
                    })
                    .catch(err => {
                        res.status(500).json({ message: `Failed to get tasks for project ${req.params.id}` });
                    })
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to get project ${req.params.id}` });
        })
})


// post(create)
router.post('/:id/resources', (req, res) => {
    const resourceData = req.body
    const { id } = req.params

    Projects.getProject(id)
        .then(project => {
            if(project) {
                Projects.addResource(resourceData, id)
                    .then(resource => {
                        res.status(201).json(resource)
                    })
            } else {
                res.status(404).json({ message: `Could not find project ${id}` })

            }
        })
})

// adding a project to a resource
// api/projects/:resource_id/projects
// project 4 under resource 3
// works
router.post('/:id/projects', (req, res) => {
    const projectData = req.body
    const { id } = req.params

    Projects.getResource(id)
        .then(resource => {
            if(resource) {
                Projects.addProject(projectData, id)
                    .then(resource => {
                        res.status(201).json(resource)
                    })
            } else {
                res.status(404).json({ message: `Could not find project ${id}` })

            }
        })
})
// works
router.post('/:id/tasks', (req, res) => {
    const taskData = req.body
    const { id } = req.params

    Projects.getProject(id)
        .then(project => {
            if(project) {
                Projects.addTask(taskData, id)
                    .then(task => {
                        res.status(201).json(task)
                    })
            } else {
                res.status(404).json({ message: `Could not find project ${id}` })

            }
        })
})


module.exports = router