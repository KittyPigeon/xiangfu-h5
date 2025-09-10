<script setup lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  VOnboardingWrapper,
  VOnboardingStep,
  useVOnboarding
} from "v-onboarding";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import "v-onboarding/dist/style.css";
const wrapper = ref(null);
const {
  start: start,
  goToStep: goToStep,
  finish: finish
} = useVOnboarding(wrapper);
const steps = ref([
  { attachTo: { element: "#foo" }, content: { title: "Welcome2!" } }
]);
// 从这里开始，webgl
const main = () => {
  const canvas = document.querySelector(
    "#glcanvas"
  ) as HTMLCanvasElement | null;
  if (!canvas) {
    alert("找不到 canvas 元素。");
    return;
  }
  // 初始化 WebGL 上下文
  const gl = canvas.getContext("webgl");

  // 确认 WebGL 支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }

  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);
};

const threeDemo = () => {
  // 三维场景
  const scene = new THREE.Scene();
  // 模型对象
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // AxesHelper：辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(250);
  scene.add(axesHelper);
  const width = window.innerWidth;
  const height = window.innerHeight;
  // 相机
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  camera.position.set(292, 223, 185);
  camera.lookAt(0, 0, 0);
  // WebGL渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  //three.js执行渲染命令会输出一个canvas画布(HTML元素)，你可以插入到web页面中
  document.getElementById("webgl")!.appendChild(renderer.domElement);
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener("change", function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件
};

onMounted(() => {
  threeDemo();
  // main();
  // start();
});
</script>

<template>
  <div>
    <div id="webgl" style="margin-top: 0px; margin-left: 0px" />

    <!-- <canvas id="glcanvas" width="340" height="480">
    你的浏览器似乎不支持或者禁用了 HTML5 <code>&lt;canvas&gt;</code> 元素。
    </canvas> -->
    threeDemo
    <VOnboardingWrapper ref="wrapper" :steps="steps">
      <template
        #default="{ previous, next, step, exit, isFirst, isLast, index }"
      >
        <VOnboardingStep>
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="sm:flex sm:items-center sm:justify-between">
                <div v-if="step.content">
                  <h3
                    v-if="step.content.title"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    {{ step.content.title }}
                  </h3>
                  <div
                    v-if="step.content.description"
                    class="mt-2 max-w-xl text-sm text-gray-500"
                  >
                    <p>{{ step.content.description }}</p>
                  </div>
                </div>
                <div
                  class="mt-5 space-x-4 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center relative"
                >
                  <span
                    class="absolute right-0 bottom-full mb-2 mr-2 text-gray-600 font-medium text-xs"
                    >{{ `${index + 1}/${steps.length}` }}</span
                  >
                  <template v-if="!isFirst">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 font-medium text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
                      @click="previous"
                    >
                      Previous
                    </button>
                  </template>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    @click="next"
                  >
                    {{ isLast ? "Finish" : "Next" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </VOnboardingStep>
      </template>
    </VOnboardingWrapper>
    <div>
      <button id="foo">Welcome</button>
    </div>
  </div>
</template>

<style scoped></style>
