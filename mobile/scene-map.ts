import { RpgGui, PrebuiltGui, RpgSceneMapHooks } from '@rpgjs/client'

const sceneMap: RpgSceneMapHooks = {
    onAfterLoading() { 
        if (!isMobileDevice()) {
            RpgGui.hide(PrebuiltGui.Controls);
        }
    }
}

function isMobileDevice() {
    return window.innerWidth <= 768;
}

export default sceneMap