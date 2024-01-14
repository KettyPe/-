document.addEventListener('DOMContentLoaded', () => {
     const date = {
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
          years: new Date().getFullYear()
     }

     fetch('actions.json')
          .then(response => response.json())
          .then(data => displayActions(data, date))
          .catch(error => console.error('Ошибка запроса', error));

     /* fetch('getServerDate.php')
          .then(response => response.json())
          .then(date => {
               fetch('actions.json')
                    .then(response => response.json())
                    .then(data => displayActions(data, date))
                    .catch(error => console.error('Ошибка запроса', error));
          })
          .catch(error => console.error('Ошибка запроса', error)); */
});

const displayActions = (actionsData, date) => {

     const actionsContainer = document.querySelector('.actions-container');
     const currentDate = new Date(date.years, date.month - 1, date.day);


     actionsData.forEach(action => {
          const StartDate = new Date(action.start_date);
          const EndDate = new Date(action.end_date);

          if (currentDate >= StartDate && currentDate <= EndDate) {
               const actionElement = createActions(action, StartDate, EndDate);
               actionsContainer.appendChild(actionElement);
          }
     });
};

const createActions = (action, StartDate, EndDate) => {
     const actionElement = document.createElement('div');
     actionElement.classList.add('action');

     const titleAction = document.createElement('h2');
     titleAction.classList.add('action__title');
     titleAction.textContent = action.title;

     const descrAction = document.createElement('p');
     descrAction.classList.add('action__descr');
     descrAction.textContent = action.conditions;

     const discount = document.createElement('div');
     discount.classList.add('action__discount');
     discount.textContent = `Скидка: ${action.discount}%`;

     const dates = document.createElement('div');
     dates.classList.add('action__dates');
     dates.textContent = `${formatDate(StartDate)} - ${formatDate(EndDate)}`;

     actionElement.appendChild(titleAction);
     actionElement.appendChild(descrAction);
     actionElement.appendChild(discount);
     actionElement.appendChild(dates);

     return actionElement;
};

const formatDate = (dateString) => {
     const date = new Date(dateString);

     const options = {
          day: 'numeric',
          month: 'long'
     };

     return date.toLocaleDateString('ru-RU', options);
}
