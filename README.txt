- La route get est accessible à l'url : '/api/dashboards/{id_dashboard}/tasks
Elle permet d'afficher la liste des tasks associée à un dashboard.

- La route post est accessible à l'url: '/api/tasks' elle nécessite une task en body exemple : 

{
    "id_dashboard" : 1,
    "id_creator" : 1,
    "description" : "new task",
    "state" : "en cours",
    "id_contributors" : [1,4]
}

- La route delete est accessible à l'url '/api/tasks/{id_task}'
Elle permet d'effacer une task

- La route put est accessible à l'url '/api/tasks/{id}' elle nécessite un 'state' en body exemple : 

{
    "state" : "terminé"
}

