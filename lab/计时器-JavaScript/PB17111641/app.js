let inp = document.getElementsByTagName('input');
let countup = document.getElementById('countup');
let countdown = document.getElementById('countdown');
let time = document.getElementById('time');
let pause = document.getElementById('pause');
let resume = document.getElementById('resume');
let reset = document.getElementById('reset');
let clear = document.getElementById('clear');
let hint = document.getElementById('hint');
let label = document.getElementsByClassName('lbl');
let hour, minute, second;
let upClear = 1, downClear = 1;//用来记录设定的interval是否被清空，1表示已经被清空，0表示没有被清空
let countingUp, countingDown;
let UporDown = 0;//用来记录当前是正计时还是倒计时，1是正计时，2是倒计时
let nowHour, nowMinute, nowSecond, nowTenth;
let pausing = 0;//记录当前是否是暂停状态，1表示正在运行，2表示暂停

countup.onclick = up;           //正计时
countdown.onclick = down;       //倒计时
clear.onclick = clkClear;      //清空
reset.onclick = clkReset;      //重置
pause.onclick = clkPause;      //暂停
resume.onclick = clkResume;    //继续

//正计时
function up() {
    hour = Number(inp[0].value);
    minute = Number(inp[1].value);
    if (minute > 59) minute = 59;
    second = Number(inp[2].value);
    if (second > 59) second = 59;
    if(second < 0 || minute < 0 || hour < 0) {
        alert("Wrong Input!");
        nowHour = 0;
        nowMinute = 0;
        nowSecond = 0;
        UporDown = 0;
        nowTenth = 0;
        return;
    }
    UporDown = 1;
    pausing = 1;
    time.innerHTML = '00:00:00';

    countup.style.display = 'none';
    countdown.style.display = 'none';
    for(let i = 0;i < 3;i++) {
        inp[i].style.display = 'none';
    }
    for(let i = 0;i < 3;i++) {
        label[i].style.display = 'none';
    }

    hint.innerText = '正在正计时 ' + TimeDisplay(hour, minute, second);
    clear.innerHTML = '<span id=\'clear_text\'>清空正计时</span>';
    pause.style.display = 'block';
    clear.style.display = 'block';
    reset.style.display = 'block';
    hint.style.display = 'block';
    nowSecond = 0;
    nowMinute = 0;
    nowHour = 0;
    nowTenth = 0;
    upClear = 0;

    if (nowSecond == second && nowMinute == minute && hour == nowHour) {          //如果计时时间到了就结束计时
        upClear = 1;
        clk_stop();
        return;
    }

    countingUp = setInterval(() => {
        nowTenth += 1;
        if (nowTenth >= 10) {
            nowSecond += 1;
            nowTenth = 0;
        }
        if (nowSecond >= 60) {
            nowMinute += 1;
            nowSecond = 0;
        }
        if (nowMinute >= 60) {
            nowHour += 1;
            nowMinute = 0;
        }
        time.innerHTML = TimeDisplay(nowHour, nowMinute, nowSecond);
        if (nowSecond == second && nowMinute == minute && hour == nowHour && nowTenth == 0) {          //如果计时时间到了就结束计时
            clearInterval(countingUp);
            upClear = 1;
            clk_stop();
            return;
        }
    }, 100);
}

//时间走完而停止
function clk_stop() {
    pausing = 0;
    pause.style.display = 'none';
    if (UporDown == 1) {
        hint.innerText = '正计时 ' + TimeDisplay(hour, minute, second) + ' 已结束';                                      
    } else if  (UporDown == 2) {
        hint.innerText = '倒计时 ' + TimeDisplay(hour, minute, second) + ' 已结束';
    }
}

//倒计时
function down() {
    hour = Number(inp[0].value);
    minute = Number(inp[1].value);
    if (minute > 59) minute = 59;
    second = Number(inp[2].value);
    if (second > 59) second = 59;
    if(second < 0 || minute < 0 || hour < 0) {
        alert("Wrong Input!");
        nowHour = 0;
        nowMinute = 0;
        nowSecond = 0;
        UporDown = 0;
        nowTenth = 0;
        return;
    }
    UporDown = 2;
    pausing = 1;
    
    // time.innerHTML = TimeDisplay(hour, minute, second);

    countup.style.display = 'none';
    countdown.style.display = 'none';
    for(let i = 0;i < 3;i++) {
        inp[i].style.display = 'none';
    }
    for(let i = 0;i < 3;i++) {
        label[i].style.display = 'none';
    }

    hint.innerText = '正在倒计时 ' + TimeDisplay(hour, minute, second);
    pause.style.display = 'block';
    clear.style.display = 'block';
    reset.style.display = 'block';
    hint.style.display = 'block';
    nowSecond = second;
    nowMinute = minute;
    nowHour = hour;
    nowTenth = 0;
    downClear = 0;

    if (nowSecond == 0 && nowMinute == 0 && nowHour == 0) {
        downClear = 1;
        clk_stop();
        return;
    }

    countingDown = setInterval(() => {
        nowTenth -= 1;
        if (nowTenth < 0) {
            nowTenth = 9;
            nowSecond -= 1;
        }
        if (nowSecond < 0) {
            nowSecond = 59;
            nowMinute -= 1;
        }
        if (nowMinute < 0) {
            nowMinute = 59;
            nowHour -= 1;
        }
        time.innerHTML = TimeDisplay(nowHour, nowMinute, nowSecond);
        if (nowSecond == 0 && nowMinute == 0 && nowHour == 0 && nowTenth == 0) {
            clearInterval(countingDown);
            downClear = 1;
            clk_stop();
            return;
        }
    }, 100);
}

//清空计时
function clkClear() {
    UporDown = 0;
    pausing = 0;
    if (upClear == 0) {
        clearInterval(countingUp);
    }
    if (downClear == 0) {
        clearInterval(countingDown);
    }
    for(let i = 0;i < 3;i++) {
        inp[i].style.display = 'block';
        // inp[i].placeholder = 0;
    }
    for(let i = 0;i < 3;i++) {
        label[i].style.display = 'block';
    }
    countup.style.display = 'block';
    countdown.style.display = 'block';

    time.innerHTML = '00:00:00';
    pause.style.display = 'none';
    clear.style.display = 'none';
    reset.style.display = 'none';
    hint.style.display = 'none';
    pause.style.display = 'none';
    resume.style.display = 'none';
}

//重新再计时
function clkReset() {
    reset.blur();
    pausing = 1;
    pause.style.display = 'block';
    resume.style.display = 'none';
    if (upClear == 0) {
        clearInterval(countingUp);
    }
    if (downClear == 0) {
        clearInterval(countingDown);
    }
    if (UporDown == 1) {//如果是正计时
        up();
    }
    else if (UporDown == 2) {//如果是倒计时
        down();
    }
}

//暂停计时器
function clkPause() {
    pausing = 2;
    if (upClear == 0) {
        clearInterval(countingUp);
    }
    if (downClear == 0) {
        clearInterval(countingDown);
    }
    pause.style.display = 'none';
    resume.style.display = 'block';
    if (UporDown == 1) {
        hint.innerText = '暂停正计时 ' + TimeDisplay(hour, minute, second);
    }
    else if (UporDown == 2) {
        hint.innerText = '暂停倒计时 ' + TimeDisplay(hour, minute, second);
    }
}

//恢复计时器
function clkResume() {
    pausing = 1;
    if (UporDown == 1) {//如果是正计时
        hint.innerText = '正在正计时 ' + TimeDisplay(hour, minute, second);
        countingUp = setInterval(() => {
            nowTenth += 1;
            if (nowTenth >= 10) {
                nowSecond += 1;
                nowTenth = 0;
            }
            if (nowSecond >= 60) {
                nowMinute += 1;
                nowSecond = 0;
            }
            if (nowMinute >= 60) {
                nowHour += 1;
                nowMinute = 0;
            }
            time.innerHTML = TimeDisplay(nowHour, nowMinute, nowSecond);
            if (nowSecond == second && nowMinute == minute && hour == nowHour && nowTenth == 0) {          //如果计时时间到了就结束计时
                clearInterval(countingUp);
                upClear = 1;
                clk_stop();
                return;
            }
        }, 100);
    }
    else if  (UporDown == 2) {
        hint.innerText = '正在倒计时 ' + TimeDisplay(hour, minute, second);
        countingDown = setInterval(() => {
            nowTenth -= 1;
            if (nowTenth < 0) {
                nowTenth = 9;
                nowSecond -= 1;
            }
            if (nowSecond < 0) {
                nowSecond = 59;
                nowMinute -= 1;
            }
            if (nowMinute < 0) {
                nowMinute = 59;
                nowHour -= 1;
            }
            time.innerHTML = TimeDisplay(nowHour, nowMinute, nowSecond);
            if (nowSecond == 0 && nowMinute == 0 && nowHour == 0 && nowTenth == 0) {
                clearInterval(countingDown);
                downClear = 1;
                clk_stop();
                return;
            }
        }, 100);
    }
    pause.style.display = 'block';
    resume.style.display = 'none';
}

window.addEventListener('keyup',keyup);
function keyup(event) {
    switch(event.keyCode) {
        case 13: {//输入回车
            if (UporDown == 0) {
                up();
            }
            break;
        }
        case 32: {//输入空格
            if (pausing == 1) {
                clkPause();
            } else if (pausing == 2) {
                clkResume();
            }
            break;
        }
        default:break;
    }
}


function TimeDisplay(h,m,s) {
    let dh = (h >= 0 && h <= 9) ? '0' + h : h;
    let dm = (m >= 0 && m <= 9) ? '0' + m : m;
    let ds = (s >= 0 && s <= 9) ? '0' + s : s;
    return dh + ':' + dm + ':' + ds;
}
