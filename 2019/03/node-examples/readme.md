# NodeJs examples

- 学习 fs 模块
 1. 一次性加载的，不会二次加载的，项目启动的配置文件，使用 Sync API
 2. 体积较大，需要多次读写，可能影响到业务流程的响应速度，使用 Async API
 3. 特殊情况特殊处理，随机应变，如果不知道选择，保险起见使用 Async API
 4. 注意: 使用 Sync API, 要补货错误，避免程序崩溃
 5. 读写都有两种方式， 一种粗颗粒的，一种精细化的，精细化需要先打开文件，然后读写，在手动close
 6. 粗狂的读写适合一次性服务的(readFile, appendFile, writeFile)
 7. 精细化的读写适合多次写入和读取文件
 8. write多次对同一文件write不安全，必须等到callback后调用，官方推荐createWriteStream