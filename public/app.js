import $ from 'jquery';

$('document').ready(() => {
  $('submit').click(() => {
    console.log($('#server-name'));
  });
});