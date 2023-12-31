const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const taskList = [];

function createTask(title, description = '', difficulty, expireDate) {
  const task = {
    title: title,
    description: description,
    status: "pendiente",
    creationDate: Date(),
    lastEditDate: Date(),
    expireDate: expireDate,
    difficulty: difficulty
  };
  taskList.push(task);
}

function changeStatus(title, newStatus) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].title === title) {
      taskList[i].status = newStatus;
    }
  }
}

function showTask(task) {
  console.log("Titulo:", task.title);
  console.log("Estado:", task.status);
  console.log("Descripción:", task.description);
  console.log("Fecha de creación:", task.creationDate);
  console.log("Fecha de vencimiento:", task.expireDate);
  console.log("Dificultad:", getDifficultyStars(task.difficulty));
  console.log("Última edición:", task.lastEditDate);
}

function showTaskAndEdit(task) {
    console.log("Titulo:", task.title);
    console.log("Estado:", task.status);
    console.log("Descripción:", task.description);
    console.log("Fecha de creación:", task.creationDate);
    console.log("Fecha de vencimiento:", task.expireDate);
    console.log("Dificultad:", getDifficultyStars(task.difficulty));
    console.log("Última edición:", task.lastEditDate);
  
    rl.question("\nPresione 'E' para editar la tarea, '0' para volver: \n", (response) => {
      if (response.toLowerCase() === 'e') {
        editTask(task);
      } else if (response === '0') {
        mainMenu();
      } else {
        console.log("Opción no válida. Volviendo al Menú Principal.");
        mainMenu();
      }
    });
}

function getDifficultyStars(difficulty) {
  switch (difficulty.toLowerCase()) {
    case 'baja':
      return '★☆☆';
    case 'media':
      return '★★☆';
    case 'alta':
      return '★★★';
    default:
      return difficulty;
  }
}

function editTask(task) {
    rl.question("Nuevo título (Enter para mantener el actual): ", (newTitle) => {
      rl.question("Nueva descripción (Enter para mantener la actual): ", (newDescription) => {
        rl.question("Nuevo estado (en curso/pendiente/terminada) (Enter para mantener el actual): ", (newStatus) => {
          rl.question("Nueva dificultad (Enter para mantener la actual): ", (newDifficulty) => {
            rl.question("Nueva fecha de vencimiento (formato dd/mm/yyyy, Enter para mantener la actual): ", (newExpireDate) => {
              task.title = newTitle || task.title;
              task.description = newDescription || task.description;
              task.status = newStatus || task.status;
              task.difficulty = newDifficulty || task.difficulty;
              task.expireDate = newExpireDate || task.expireDate;
              task.lastEditDate = Date();
  
              console.log("Tarea editada con éxito.");
              rl.question("Presiona Enter para volver al Menú Principal.", () => {
                mainMenu();
              });
            });
          });
        });
      });
    });
  }

function displayMainMenu() {
  console.log("Menú principal");
  console.log("1. Ver mis tareas\n2. Buscar una tarea\n3. Crear tarea\n0. Salir");
}

function displaySubMenu() {
  console.log("Qué tareas deseas ver?");
  console.log("1. Todas\n2. Pendientes\n3. En curso\n4. Terminadas\n5. Volver\n");
}

function mainMenu() {
  rl.question("Presiona Enter para mostrar el Menú Principal.", () => {

    displayMainMenu();

    rl.question("?", (main_menu) => {
      switch (main_menu) {
        case '1':
          displaySubMenu();

          rl.question("?", (sub_menu) => {
            switch (sub_menu) {
                case '1': // Todas
                console.log("Mostrando todas las tareas...\n");
              
                taskList.sort((a, b) => a.title.localeCompare(b.title));
              
                for (let i = 0; i < taskList.length; i++) {
                  showTask(taskList[i]);
                }
              
                rl.question("Presiona Enter para volver al Menú Principal.", () => {
                  mainMenu();
                });
                break; 

              case '3': // En curso
                console.log("Mostrando todas las tareas en curso...\n");

                for (let i = 0; i < taskList.length; i++) {
                  if (taskList[i].status.toLowerCase() === "en curso") {
                    showTask(taskList[i]);
                  }
                }
                break;

              case '4': // Terminadas
                console.log("Mostrando todas las tareas terminadas...\n");

                for (let i = 0; i < taskList.length; i++) {
                  if (taskList[i].status.toLowerCase() === "terminada") {
                    showTask(taskList[i]);
                  }
                }
                break;

              default:
                console.log("Respuesta inválida. Vuelva a intentarlo.\n");
                break;
            }
            rl.question("Presiona Enter para volver al Menú Principal.", () => {
              displayMainMenu();
            });
          });
          break;

          case '2':
            rl.question("Ingrese el título de la tarea a buscar: ", (taskTitle) => {
              let taskFound = false;
              for (let i = 0; i < taskList.length; i++) {
                if (taskList[i].title === taskTitle) {
                  showTaskAndEdit(taskList[i]);
                  taskFound = true;
                  break;
                }
              }
          
              if (!taskFound) {
                console.log("Tarea no encontrada.");
              }
          
              rl.question("Presiona Enter para volver al Menú Principal.", () => {
                mainMenu();
              });
            });
            break;

        case '3':
          rl.question("Ingrese el título de la tarea: ", (title) => {
            rl.question("Ingrese la descripción de la tarea: ", (description) => {
              rl.question("Ingrese la dificultad de la tarea (baja/media/alta): ", (difficulty) => {
                rl.question("Ingrese la fecha de vencimiento (formato dd/mm/yyyy): ", (expireDate) => {
                  createTask(title, description, difficulty, expireDate);
                  console.log("Tarea creada con éxito.");
                  rl.question("Presiona Enter para volver al Menú Principal.", () => {
                    mainMenu();
                  });
                });
              });
            });
          });
          break;

        case '0':
          console.log("Fin del programa \n");
          rl.close();
          break;

        default:
          console.log("Opción no válida. Intente de nuevo.");
          mainMenu();
          break;
      }
    });

  });
}

mainMenu();


