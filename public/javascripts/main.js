function getAnswer() {
    var selectedValue = $("input[type='radio'][name='answer']:checked").val();
    console.log(selectedValue);
    answers[current] = selectedValue;
    console.log(answers);
}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/api/exam/' + window.location.pathname.split('/')[2],
        dataType: "json",
        success: function (big) {
            data = big.data;
            total = data.length;
            $('.CodeMirror').remove();
            $('#mycode').val(data[current].question.code);
            CodeMirror.fromTextArea(document.getElementById(
                'mycode'), {
                mode: "htmlmixed",
                readOnly: 'nocursor',
                lineNumbers: true,
            });
            $('#question-header').html(`Question ${current+1}/${total}`);
            $('#question').html(data[current].question.question.replace(/</g,
                '&lt;').replace(/>/g, '&gt;'));
            console.log(data[current].question.image);
            $('#question_image').attr('src', data[current].question.image);
            var temp = data[current].answer.answer;
            var len = temp.length;
            $("#answer").empty();
            for (var i = 0; i < len; i++) {
                if (answer[current] == i) {
                    $("#answer").append(
                        `<div class="inputGroup">
                        <input id="radio${i}" name="answer" value="${i}" type="radio" onChange="getAnswer()" checked />
                        <label for="radio${i}">${i+1}. ${data[current].answer.answer[i].replace(/</g,'&lt;').replace( />/g,'&gt;')} </label>
                        </div>`
                    );
                } else {
                    $("#answer").append(
                        `<div class="inputGroup">
                        <input id="radio${i}" name="answer" value="${i}" type="radio" onChange="getAnswer()" />
                        <label for="radio${i}">${i+1}. ${data[current].answer.answer[i].replace(/</g,'&lt;').replace( />/g,'&gt;')} </label>
                        </div>`
                    );
                }
            }
        }
    });
}

function getResult(answers, total) {
    var result = new Array(total);
    var i;
    for (i = 0; i < total; ++i) {
        if (answers[i])
            result[i] = answers[i];
        else
            result[i] = -1;
    }
    return result;
}


var current = 0;
var total;
var answers = [];

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/api/exam/' + window.location.pathname.split('/')[2],
        dataType: "json",
        success: function (big) {
            display = $('#timer');
            time = big.time;
            console.log(time);
            var now = moment();
            var des = now.add(time, 'm');
            console.log(des);
            var newdes = des.toDate();
            console.log(newdes);
            $('#clock').countdown(newdes)
                .on('update.countdown', function (event) {
                    var format = '%H:%M:%S';
                    $(this).html(event.strftime(format));
                })
                .on('finish.countdown', function (event) {
                    $(this).html('Time out!');
                    $.ajax({
                        type: 'POST',
                        url: '/finish/' + window.location.pathname.split('/')[2],
                        data: {
                            answer: getResult(answers, total),
                        }
                    });
                    $.alert({
                        title: 'Time out!',
                        content: 'Simple alert!',
                        buttons: {
                            Okay: function () {
                                window.location.pathname = "/finish";
                            }
                        }
                    });
                });
        }
    });

    getData();
    

    $('#previousButton').click(function () {
        if (current > 0) {
            --current;
        }
        getData();
    })
    $('#nextButton').click(function () {
        if (current < data.length - 1) {
            ++current;
        }
        getData();
    })


    $('#finish').click(function () {
        console.log(getResult(answers, total));
        $.confirm({
            title: 'Confirm',
            content: 'Are you sure?',
            buttons: {
                Confirm: function () {
                    window.location.pathname = "/finish";
                    $.ajax({
                        type: 'POST',
                        url: '/finish/' + window.location.pathname.split('/')[2],
                        data: {
                            answer: getResult(answers, total),
                        }
                    });
                },
                Cancel: function () {
                    //close
                },
            }
        });
    });
})