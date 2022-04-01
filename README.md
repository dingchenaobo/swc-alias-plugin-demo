尝试使用 swc 的插件机制做一些尝试

第一步是 alias 的尝试

一些问题：
- 为什么 ts config 的 paths 的 value 要设计成 list 呢？这个设计感觉很奇怪；

- paths 的 key 是，emmm 什么匹配规则？看起来像是 glob，但是却不是。如果是 glob，那么 ```@/*``` 理论上应该无法匹配```@/middleware/log``` 才对，应该是 ```@/**/*``` 或者 ```@/**```，换正则试试。；
