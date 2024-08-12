# cloudflare-worker-helm-proxy
使用cloudflare worker进行helm chart拉取加速

支持对任意helm chart，使用cloudflare worker进行加速


## 部署
- [cloudflare](https://dash.cloudflare.com/)上进入`Worker和Pages`界面，点击右边的创建
- 在编辑中，复制仓库中的worker.js进去
- 点击部署即可
- 还可以从设置-触发器-自定义域中，配置自定义的域名 （自动生成的worker域名一般是国内是无法访问的，需要绑定自己的域名）

## 用法

假如我们需要对https://charts.bitnami.com/bitnami进行加速

只需要将Chart.yaml中的地址加上前缀（worker_url是我们配置的worker域名或者自定义域名）
https://{worker_url}/proxy/

变成https://{worker_url}/proxy/https://charts.bitnami.com/bitnami
便可以享受到cloudflare带来的加速效果了

```bash
# 加速bitnami
helm repo add bitnami https://${worker_url}/https://charts.bitnami.com/bitnami
helm search repo stable/zetcd
```
