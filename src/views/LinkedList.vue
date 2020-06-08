<template>
  <div class="page">
    <div class="actions">
      <div class="row">
        <label>节点值：</label>
        <input type="text" v-model="dtext">
        <button @click="addNode" :disabled="addNodeBtnDisabled">添加节点</button>
      </div>
      <div class="row">
        <label>指针：</label>
        <input type="text" v-model="ptext">
        <button @click="addPoint" :disabled="addPointBtnDisabled">添加指针</button>
      </div>
      <div class="row">
        <button class="prev" @click="movePoint('prev')">左移指针</button>
        <button class="next" @click="movePoint('next')">右移指针</button>
        <button class="remove" @click="remove">删除</button>
      </div>
    </div>
    <div class="graph">
      <div class="node" :class="{select: selectedNode && selectedNode.id === node.id}" v-for="node in nodes" :key="node.id"
           @click="selectNode(node.id)">
        <div class="data">{{node.data}}</div>
        <div class="next"></div>
        <div class="points" @click.stop>
          <div class="point" :class="{select: selectedPoint && selectedPoint.id === point.id}" v-for="point in node.points"
               :key="point.id" @click="selectPoint(node.id, point.id)">
            <div class="line"></div>
            <div class="angle"></div>
            <span class="text">{{point.text}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function getRandomId() {
  return new Date().getTime();
}

export default {
  name: 'LinkedList',
  data: function() {
    return {
      dtext: '',
      ptext: '',
      nodes: [],
      selectedNode: null,
      selectedPoint: null
    };
  },
  computed: {
    addNodeBtnDisabled() {
      return !this.dtext.trim()
    },
    addPointBtnDisabled() {
      return this.selectedNode === null || !this.ptext.trim()
    }
  },
  mounted() {
    this._loadData();
    window.addEventListener('beforeunload', () => {
      // this._storeData();
    }, false);
  },
  beforeDestroy() {
    this._storeData();
  },
  methods: {
    _storeData() {
      window.localStorage.setItem('linked_list_data', JSON.stringify(this.nodes));
    },
    _loadData() {
      const data = window.localStorage.getItem('linked_list_data');
      if (data) {
        this.nodes = JSON.parse(data);
      }
    },
    addNode() {
      if (this.dtext.trim()) {
        this.nodes.push({ id: getRandomId(), data: this.dtext.trim(), next: null, points: [] });
        this.dtext = ''
      }
    },
    addPoint() {
      if (this.selectedNode !== null && this.ptext.trim()) {
        const node = this.nodes.find(n => n.id === this.selectedNode.id);
        node.points.push({ id: getRandomId(), text: this.ptext.trim(), nid: this.selectedNode.id });
        this.ptext = '';
      }
    },
    selectNode(nid) {
      if (this.selectedNode && this.selectedNode.id === nid) {
        this.selectedNode = null;
      } else {
        this.selectedNode = this.nodes.find(n => n.id === nid);
      }
    },
    selectPoint(nid, pid) {
      if (this.selectedPoint && this.selectedPoint.id === pid) {
        this.selectedPoint = null;
      } else {
        this.selectedPoint = this.nodes.find(n => n.id === nid).points.find(p => p.id === pid);
      }
    },
    movePoint(dir) {
      if (this.selectedPoint === null) {
        return
      }
      const node = this.nodes.find(n => n.id === this.selectedPoint.nid);
      let targetNodeIdx = null;
      if (dir === 'prev') {
        targetNodeIdx = this.nodes.indexOf(node) - 1
      } else if (dir === 'next') {
        targetNodeIdx = this.nodes.indexOf(node) + 1
      }

      if (targetNodeIdx < 0 || targetNodeIdx > this.nodes.length - 1) {
        // 超出边界
        return;
      }

      // 调整point内部指针
      this.selectedPoint.nid = this.nodes[targetNodeIdx].id;
      this.nodes[targetNodeIdx].points.push(this.selectedPoint);
      node.points = node.points.filter(p => p.id !== this.selectedPoint.id);
    },
    remove() {
      if (this.selectedPoint !== null) {
        const node = this.nodes.find(n => n.id === this.selectedPoint.nid);
        node.points = node.points.filter(p => p.id !== this.selectedPoint.id);
        this.selectedPoint = null;
      }
      if (this.selectedNode !== null) {
        this.nodes = this.nodes.filter(n => n.id !== this.selectedNode.id);
        this.selectedNode = null;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  html,body {
    margin: 0;
    padding: 0;
  }
  #app {

  }

  .graph {
    display: flex;
    flex-wrap: wrap;
    margin: 150px 30px;
  }

  .node {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100px;
    height: 40px;
    border: 2px solid #dbdbdb;
    box-sizing: border-box;
    margin-right: 60px;
    margin-bottom: 130px;
  }
  .node.select {
    border-color: #3362db;
  }
  .node > .data {
    flex: 1;
    text-align: center;
    line-height: 40px;
  }
  .node > .prev {
    width: 30px;
    background: darksalmon;
  }
  .node > .next {
    width: 30px;
    background: aquamarine;
  }
  .node > .points {
    position: absolute;
    bottom: 38px;
    display: flex;
  }

  .point {
    position: relative;
    bottom: -10px;
    width: 40px;
  }
  .point.select > .line {
    background-color: #3362db;
  }
  .point.select > .angle {
    border-top-color: #3362db;
  }
  .point > .line {
    width: 2px;
    height: 80px;
    background-color: darksalmon;
    margin: 0 auto;
  }
  .point > .angle {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: darksalmon;
    margin: 0 auto;
  }
  .point > .text {
    position: absolute;
    top: -20px;
    font-size: 14px;
  }

  .actions {
    width: 500px;
    margin: 0 auto 150px auto;
  }

  label {
    display: inline-block;
    width: 80px;
  }
  input {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    outline: none;
    background: #eee;
    padding: 0 5px;
    border: 1px solid transparent;
    box-sizing: border-box;
  }
  input:focus {
    border-color: aquamarine;
  }
  button {
    font-size: 18px;
    padding: 8px 15px;
    border-radius: 4px;
    outline: none;
  }
  button:active {
    background: aquamarine;
  }
  button[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .row {
    padding: 10px 0;
  }
</style>
