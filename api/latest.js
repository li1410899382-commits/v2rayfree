export default async function handler(req, res) {
  // 拉取你的仓库文件列表
  const repoRes = await fetch('https://api.github.com/repos/li1410899382-commits/v2rayfree/contents/');
  const files = await repoRes.json();

  // 筛选出所有 v20 开头的节点文件，并按名称降序取最新的
  const nodeFiles = files
    .filter(f => f.name.startsWith('v20'))
    .sort((a, b) => b.name.localeCompare(a.name));

  if (nodeFiles.length === 0) {
    return res.status(404).send('未找到节点文件');
  }

  const latestFileName = nodeFiles[0].name;

  // 读取最新节点文件内容
  const contentRes = await fetch(`https://raw.githubusercontent.com/li1410899382-commits/v2rayfree/main/${latestFileName}`);
  const content = await contentRes.text();

  // 返回节点内容
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(content);
}
