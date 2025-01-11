'use strict';

let QUIZNUM = 1;
let idx = 1;
let isLocked = false;
let correctMatch = 0; 

$(document).ready(function () {
  soundSet();

  qs('.pwd_wrapper .btn').click(function () {
    if (isLocked) return;

    let $quiz = $(this).closest('.quiz');
    let matchNum = parseInt($(this).attr('data-match'), 10); 
    let thisWordText = $(this).find('.this_word').text();

    $(this).addClass('on');

    let $currentPwd = qs(`.pwd.p${correctMatch + 1}`); 
    $currentPwd.addClass('on');
    $currentPwd.html(`<span>${thisWordText}</span>`);  

    
    if (matchNum === correctMatch + 1) {
      if ($(this).hasClass('correct')) {
        playSound('correct');
        correctMatch++; 
        $(this).removeClass('active')
        $(this).find('span').text('');
      }
    } else {
      if ($(this).hasClass('correct')) {
        isLocked = true;
        playSound('incorrect');
        $currentPwd.addClass('incorrect');

        setTimeout(() => {
          $currentPwd.removeClass('on incorrect');
          $(this).removeClass('on');
          $quiz.removeClass('on');
          isLocked = false;
        }, 1000);
      }
    }
    if (qs('#container').hasClass('finish') && qs('.reset_btn').classList.contains('on')) {
      e.preventDefault(); 
      return; 
  }
    if ($(this).hasClass('incorrect')) {
      isLocked = true;
      playSound('incorrect');
      $currentPwd.addClass('incorrect');

      setTimeout(() => {
        $currentPwd.removeClass('on incorrect');
        $(this).removeClass('on');
        $quiz.removeClass('on');
        isLocked = false;
      }, 1000);
    }

    if (qs('.pwd_wrapper .btn.correct.on').length === qs('.pwd_wrapper .btn.correct').length) {
      qs('.reset_btn').addClass('on');
      qs('.ui_pop').addClass('show');
      qs('#container').addClass('finish');
      playSound('complete');
      return;
    }
  });
  
  qs('.btn.reset_btn').click(function () {
    clickSound();
    reset();
  });
});

function playSound(type) {
  let audio;
  if (type === 'correct') {
    audio = new Audio('common/sound/correct.mp3');
  } else if (type === 'incorrect') {
    audio = new Audio('common/sound/incorrect.mp3');
  } else if (type === 'complete') {
    audio = new Audio('common/sound/complete.mp3');
  }
  audio.play();
}

function reset() {
  location.reload();
}
