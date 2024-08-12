# cloudflare-worker-helm-proxy
使用cloudflare worker进行helm chart拉取加速

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/deepwzh/cloudflare-worker-helm-proxy)

支持对任意helm chart，使用cloudflare worker进行加速

## 用法

假如我们需要对https://charts.bitnami.com/bitnami进行加速

只需要将Chart.yaml中的地址加上前缀
https://{worker_url}/proxy/

变成https://{worker_url}/proxy/https://charts.bitnami.com/bitnami
便可以享受到cloudflare带来的加速效果了

```bash
# 加速bitnami
helm repo add bitnami https://${worker_url}/https://charts.bitnami.com/bitnami
helm search repo stable/zetcd
```