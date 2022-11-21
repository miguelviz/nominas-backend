# NodeJS BACKEND README.
Installation:
    1.-Clone the proyect
    2.-Install dependencies (npm install)
    3.-start the proyect (npm start)
-----------------------------------------------------------------------------
# Principal params: 
    route: ./Utils/ServerOptions.js
    params:{
        salary_worker:INT, 
        package_bonus:INT, -- Bonus per hour
        hours_worked_per_month:INT, -- (8*6*4)
        isr_porcent:INT,
        isr_extra_porcent:INT, -- add when salary_total >= max_salary_extra
        max_salary_extra:INT
    }
-----------------------------------------------------------------------------
# Project Structure:
    APIS:{
        GetWorkers,
        CreateWorker,
        AddPackages,
        RestartPackages
    }
    route: ./Backend/index.js
    GET/*:{
        ./build 
    }
    program_type: [async-await] functional programming.
    important_libraries: express - mysql2
-----------------------------------------------------------------------------
