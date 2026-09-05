# CLAUDE.md

## 프로젝트 개요

Webpack 5 Module Federation을 활용한 Micro-Frontend 예제 프로젝트.
Turborepo 모노레포 구조로 Host(Vue/Quasar)와 Remote(React) 앱을 연동한다.

## 프로젝트 구조

```
module-federation-example/
├── apps/
│   └── main/              # Host App (Vue 3 + Quasar + Webpack)
├── packages/
│   └── module/            # Remote App (React 18 + Webpack 5)
├── turbo.json
└── package.json
```

## 컴포넌트: 이부분만 건드릴것
host: 
apps/main/src/components/modules/RemoteComponent.vue
apps/main/src/pages/IndexPage.vue

client: packages/module/src/entries/TestRoot.tsx

## 빠른 참조

```bash
yarn install               # 전체 의존성 설치
yarn dev                   # 전체 개발 서버 (turbo)
yarn build                 # 전체 빌드
yarn deploy                # 전체 배포 (Vercel)
```

### 개별 실행

| 앱 | 명령 | 포트 |
|----|------|------|
| main (host) | `yarn local` | 8081 |
| module (remote) | `yarn dev` | 3010 |

## 기술 스택

### main (Host)
- Vue 3, Quasar 2, Vuex 4, Pinia, Vue Router 4
- `@quasar/app-webpack` (Webpack 기반)
- React 18 + ReactDOM (remote module 렌더링용)

### module (Remote)
- React 18, TypeScript
- TanStack Query v5, Jotai (상태 관리)
- Tailwind CSS 3
- Webpack 5 + Babel

---

## Module Federation 연동 구조

### 흐름

```
Host (main:8081)
  → remotes: { User: "User@{REMOTE_URL}/user.remoteEntry.js" }
  → import('User/mftest')
  → RemoteComponent.vue가 React 컴포넌트를 Vue DOM에 마운트

Remote (module:3010)
  → name: 'User'
  → filename: 'user.remoteEntry.js'
  → exposes: { './mftest': './src/entries/TestRoot' }
```

### 공유 의존성

react, react-dom을 `singleton: true, eager: true`로 설정하여 단일 인스턴스 보장.

### Host 측 (main)

**`quasar.conf.js`** - Module Federation 설정:
- `ModuleFederationPlugin`으로 remote 모듈 등록
- `getRemoteUrlByEnv()`로 환경별 remote URL 분기
- `extendWebpack`에서 entry를 `.quasar/main.js`로 변경 (Quasar + MFed 호환)

**`src/components/modules/RemoteComponent.vue`** - React 컴포넌트 래퍼:
- `loadRemoteModule` prop으로 remote 모듈 동적 로드
- `ReactDOM.render()`로 Vue DOM 내에 React 컴포넌트 마운트
- host context (userInfo, token, dialog, toast) 전달

**`src/utils/moduleFederation.ts`** - remote module 로더 함수

### Remote 측 (module)

**`webpack/webpack.common.js`** - Module Federation 설정:
- `name: 'User'`, `filename: 'user.remoteEntry.js'`
- `exposes`에 노출할 모듈 등록

**`src/entries/TestRoot.tsx`** - 노출되는 entry 컴포넌트:
- `Providers`로 React Query + Jotai 래핑
- TanStack Query, Jotai 사용 예제 포함

**`src/components/layouts/`**:
- `Providers.tsx` - QueryClientProvider + Jotai Provider
- `MfedInitWrapper.tsx` - host props 초기화 (hostPropsAtom에 저장)

**`src/stores/hostProps.ts`** - host에서 전달받은 props를 Jotai atom으로 관리

**`src/api/index.ts`** - host에서 주입받는 API 서비스 placeholder

---

## 환경 설정

### main

| 파일 | 용도 |
|------|------|
| `.env` | 로컬 개발용 (`VUE_APP_REACT_MODULE_FED_URL=http://localhost:3010`) |
| `.env.production` | 배포용 (`VUE_APP_REACT_MODULE_FED_URL=https://module-federation-example-module.vercel.app`) |

`quasar.conf.js`에서 `NODE_ENV`에 따라 env 파일 분기 로드.

### module

| 파일 | 용도 |
|------|------|
| `.env.development` | 개발용 |
| `.env.production` | 배포용 (`HOST_URL=https://module-federation-example-module.vercel.app`) |

`HOST_URL`은 webpack output의 `publicPath`로 사용됨. chunk 파일 로드 경로를 결정.

---

## Vercel 배포

### 프로젝트 매핑

| Vercel 프로젝트명 | 소스 | 배포 디렉토리 |
|------------------|------|--------------|
| `module-federation-example-host` | `apps/main` | `dist/spa` |
| `module-federation-example-module` | `packages/module` | `dist` |

### 배포 명령

```bash
yarn deploy                # turbo로 전체 빌드 + 배포
```

turbo task 순서: `build` → `deploy`

개별 배포:
```bash
# module 먼저
cd packages/module && yarn build:prod && yarn deploy

# main
cd apps/main && yarn build && yarn deploy
```

### 배포 시 주의사항

1. **module을 먼저 배포** → URL 확인 후 main 환경변수에 설정
2. module의 `publicPath`가 배포 URL과 일치해야 chunk 로딩 정상 동작
3. module의 `vercel.json`에 CORS 헤더 설정 필요 (`Access-Control-Allow-Origin: *`)
4. main의 `vercel.json`에 SPA rewrite 및 `/static/` 경로 redirect 설정

### publicPath 핵심

- 로컬: `webpack.common.js`의 `publicPath`에 localhost 설정
- 배포: `webpack.prod.js`가 `process.env.HOST_URL + '/'`로 오버라이드
- **publicPath가 틀리면** remoteEntry는 로드되지만 chunk 파일을 host URL에서 찾아 404 발생

---

## 새 remote 모듈 추가 시

### module 측

1. `src/entries/NewModuleRoot.tsx` 생성 (Providers 래핑)
2. `webpack/webpack.common.js`의 `exposes`에 추가:
   ```js
   './new-module': './src/entries/NewModuleRoot'
   ```

### main 측

1. `src/utils/moduleFederation.ts`에 로더 추가:
   ```ts
   export const loadNewModule = async () => {
     const res = (await import('User/new-module')).default;
     return res;
   };
   ```
2. Vue 컴포넌트에서 `RemoteComponent`로 사용:
   ```vue
   <RemoteComponent :loadRemoteModule="loadNewModule" :props="{}" />
   ```
