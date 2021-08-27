class InfoPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('InfoPlugin', (asstes) => {
            asstes['info.json'] = `{
                    'ID: '
                    webpack '}`;
        })
    }
}
module.exports = InfoPlugin;