import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const BifChainSDK = require("./lib/bifchain-js-signer/lib");

let privateKey = 'priSPKhH1wXssPE4FT5yJNQmdiBKtjjdGGa7LPfTJLsEecgbL3'
let blob = '0A286469643A6269643A6566336564503975425737544B5238365431696232684D6B6537555075637168100A228E04080712286469643A6269643A6566336564503975425737544B5238365431696232684D6B653755507563716852DF030A286469643A6269643A656634354C437344614A53385272576A58737A7031317066626F76665A744C411AB2037B226D6574686F64223A2273656E645478222C22706172616D73223A7B22657874656E73696F6E223A22616161222C227061796C6F616454797065223A2230222C227061796C6F6164223A7B22616D6F756E74223A22313030227D2C22737263426964223A22307833316364383832653161613139383732356533656465656637363134376161636133623433343665222C2264657374426964223A226469643A6269643A656652797A5A61626E56434562436D3441424E755977796653703162456A7779222C2272656D61726B223A22616161222C2270726F6F66223A7B226C6564676572536571223A22313639222C22747848617368223A22307861613037386263323464346532326238376561663736396338353635373636643038366339343633346664663461306236613463613466653631343135373961227D2C22737263436861696E436F6465223A2261323032222C2276657273696F6E223A2231303030222C2263726F737354784E6F223A22613230323A303A6338316230363930626532383039326562383634636431343233623135623231222C2264657374436861696E436F6465223A2230227D7D30C885910538E807'

const signature =  BifChainSDK.sign(blob,privateKey);
console.log(signature)