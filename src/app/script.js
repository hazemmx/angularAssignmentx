const tabs = document.querySelectorAll('.tab');
const contentDivs = document.querySelectorAll('.content div');

tabs.forEach(tab => {
  tab.addEventListener('click', (event) => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const newActiveTab = tab.innerText.trim();
    document.querySelector('app-root').componentRef.instance.tabChange.emit(newActiveTab);
    contentDivs.forEach(div => div.classList.remove('active'));
    const activeContentDiv = document.querySelector(`.content .${newActiveTab.toLowerCase()}`);
    activeContentDiv.classList.add('active');
    event.stopPropagation(); 
  });
});

