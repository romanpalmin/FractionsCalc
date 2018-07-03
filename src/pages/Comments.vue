<template>
  <div>
    <div class="title">
      {{title}}
    </div>
    <div class="comments-list">
      <ul>
        <li v-for="item in commentsList">{{item.comment}} <span class="btn-delete" @click="sendDeleteMessage(item.id)">(удалить)</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /**
   * Комментарии удаляеются в случае успешного ответа от сервера в течение заданного таймаута.
   * Если сервер вернул неожиданные данные, либо ответ произошел после заданного таймаута, комментарии не удаляются
   */

  import comments from '../data/comments';

  export default {
    name: 'comments',
    data() {
      return {
        title: 'Управление комментариями',
        wsUrl: 'ws://echo.websocket.org/',
        commentsList: comments.data,
        websocket: null,
        sendedIds: [], // список отправленных на удаление id комментариев
        waitingTimeOut: 10000, // таймаут ожидания ответа с сервера
        testId: 25, // эмуляция некорректного ответа сервера
        isDebug: false // включаем/отключаем режим отладки
      }
    },
    mounted() {
      this.websocket = new WebSocket(this.wsUrl);
      this.websocket.onopen = evt => console.log('Open');
      this.websocket.onclose = evt => console.log('Close');
      this.websocket.onmessage = evt => this.wsMessage(evt);
      this.websocket.onerror = evt => console.log(evt);
    },
    destroyed() {
      // закроем соединение при уходе с секции
      this.websocket.close();
    },
    methods: {
      /**
       * Отлавливаем сообщения с сервера
       */
      wsMessage(evt) {
        const res = +evt.data;
        const resIsInIds = this.sendedIds.indexOf(res) !== -1;
        if (resIsInIds) {
          this.deleteComment(res);
          this.deleteIdFromArray(res);
        }
      },
      /**
       * Удаляем комментарий из списка
       */
      deleteComment(id) {
        this.commentsList = this.commentsList.filter(item => item.id !== id);
      },

      /**
       * Удаляем id комментария из списка id удаляемых комментариев
       */
      deleteIdFromArray(id) {
        this.sendedIds = this.sendedIds.filter(el => el !== id);
      },
      /**
       *  Выбор метода отправки сообщения на удаление, для отладки
       */
      sendDeleteMessage(id) {
        if (this.isDebug) {
          this.sendDeleteMessageTest(id);
        } else {
          this.sendDeleteMessageProd(id);
        }
      },
      /**
       * Основная версия метода отправки сообшения на удаление
       * @param id
       */
      sendDeleteMessageProd(id) {
        // Добавим id в массив
        this.sendedIds.push(id);
        // Отправим id на сервер
        this.websocket.send(id);
        // Очистим массив по таймауту
        setTimeout(() => {
          this.deleteIdFromArray(id);
        }, this.waitingTimeOut);
      },

      /**
       * Версия метода отправки сообщения на удаление для тестирования
       * @param id
       */
      sendDeleteMessageTest(id) {
        // Добавим id в массив
        this.sendedIds.push(id);

        // Для тестирования некорректного ответа с сервера для комментария с id=5 будем отправлять testId
        if (id === 5) id = this.testId;

        // Для эмуляции невозвращаемого значение с сервера, для комментария с id=3 не будем отправлять сообщение
        if (id !== 3 && id !== 1) {
          // Отправим id на сервер
          this.websocket.send(id);
        }

        // Для эмуляции возврата с сервера с задержкой, для id=1 поставим таймаут
        if (id === 1) {
          setTimeout(() => {
            this.websocket.send(id);
          }, 3000)
        }

        // Удалим id из массива по истечению таймаута
        setTimeout(() => {
          this.deleteIdFromArray(id);
        }, this.waitingTimeOut);
      }
    }
  }
</script>

<style scoped>
  .comments-list {
    background-color: white;
    width: 50%;
    text-align: left;
    margin: 0 auto;
    border-radius: 4px;
  }

  li {
    padding: 5px;
  }

  .btn-delete {
    font-style: italic;
    font-size: smaller;
    cursor: pointer;
  }
</style>
