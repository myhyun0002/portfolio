'use strict';

/*
navbar를 navbar 크기 만큼 내려가면 navbar가 투명에서
dark--pink로 변하는 걸 구현한다.
*/


// css 에서 #navbar를 가지고 온다.
const navbar = document.querySelector('#navbar');

// navbar의 전체 높이를 getBoundingClientRect().height;를 통해 구한다.
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
  if (window.scrollY > navbarHeight){
    // class = 'navbar--dark'가 추가가 된다.
    navbar.classList.add('navbar--dark');  
  }else{
    // 만약에 크지 않다면 아까 그 클래스가 없다.
    navbar.classList.remove('navbar--dark');
  }
  // 우리가 <div class=' ~~'></div>
  // 이렇게 쓰잖아 이 때 class를 얘기한다.
  // 그래서 css에서 navbar--dark 일 때의 어떻게 실행할 건지
  // 정의해두면 그 클래스가 있는 navbar는 정의해둔 navbar--dark
  //에 따라 변하게 만드는 것이다. 
});



/*
지금부터는 navbar 메뉴 버튼과 home에 있는 contact me 버튼을 누를 때
그 해당 페이지로 가는 것을 구현해볼것이다.
*/

// 먼저 navbar 메뉴들부터

const navbarMenu = document.querySelector('.navbar__menu');
const contactMeButton = document.querySelector('.home__contact');

navbarMenu.addEventListener('click',(event) =>{
  console.log(event.target.dataset.link);
  const link = event.target.dataset.link;
  if(link == null){
    return ;
  }else{
    scrollIntoViews(link);
  }

  navbarMenu.classList.remove('open');
});

contactMeButton.addEventListener('click',() =>{
  scrollIntoViews('#contact');
  
});

function scrollIntoViews(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior : 'smooth'});
}


// 지금부터는 scroll을 내리면서 home페이지에서 멀어질수록
// home이 흐려지는 걸 해볼꺼다


const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll',()=>{
  home.style.opacity = (homeHeight-window.scrollY)/homeHeight;
});


// arrow-up 버튼을 누르면 home으로 가기
const arrowUp = document.querySelector('.arrow-up');

arrowUp.addEventListener('click',() => {
  scrollIntoViews('#home');
});

// arrow-up 버튼이 home에서 떨어지면 슬며시 나오게 하기

document.addEventListener('scroll',() =>{
  if (window.scrollY > homeHeight/2){
    arrowUp.classList.add('arrow-up--visible');
  }else{
    arrowUp.classList.remove('arrow-up--visible');
  }

});

// 지금부터는 work 부분의 work 메뉴에 있는 버튼들을 누르면
// 해당 프로젝트들이 나오게 하겠다.

const workBtnContainer = document.querySelector('.work__catagories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click',(e) =>{
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  const active = document.querySelector('.category__btn.selected');
  const target = e.target.nodeName === 'BUTTON'? e.target : e.target.parentNode;
  if (active != null){
    active.classList.remove('selected');
  }else{
    target.classList.add('selected');
  }
  projectContainer.classList.add('anima-project');
  
  setTimeout(()=>{
     // 밑에 문장은
  // for(let i = 0 ; i < length(projects);i++){
  //   console.log(projects[i]);
  // }
  // 와 같은 문장이다.
  // 혹은
  // for(let project of projects){
  // console.log(project);
  // 이거와 같다.about__majors
    projects.forEach((project)=>{
      const type = project.dataset.type;
      if(type === filter || filter ===  '*'){
        project.classList.remove('invisible');
      }else{
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anima-project');
  },300);

});


// 사이즈 줄였을 때 toggle button이 나오는데
// toggle button을 누르면 메뉴가 튀어나오게 하겠다.

const toggleBtn = document.querySelector('.navbar__toggle-btn');

toggleBtn.addEventListener('click',()=>{
  if(navbarMenu.classList.contains('open')){
    navbarMenu.classList.remove('open');
  }else{
    navbarMenu.classList.add('open');
  }

  console.log(toggleBtn.classList);
  

});

