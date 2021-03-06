const DATA_ALL = {
    myapl     : { "起動時刻":"2 days ago"    , "環境予約者":"daich", "DB向き先 tran":"dev"     , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myweb     : { "起動時刻":"3 years ago"   , "環境予約者":"hiro" , "DB向き先 tran":"prod"    , "DB向き先 master":"prod"    , "停止予定日":"2020/03/03"  },
    myapl_dev1: { "起動時刻":"14 minutes ago", "環境予約者":"daich", "DB向き先 tran":"dev"     , "DB向き先 master":"content" , "停止予定日":"2020/03/03"  },
    myweb_dev : { "起動時刻":"9 days ago"    , "環境予約者":"chika", "DB向き先 tran":"content" , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myapl_dev3: { "起動時刻":"just before"   , "環境予約者":"yoko" , "DB向き先 tran":"dev"     , "DB向き先 master":"ita"     , "停止予定日":"2020/03/03"  },
    myapl_dev4: { "起動時刻":"15 minutes ago", "環境予約者":"daich", "DB向き先 tran":"content" , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myapl_dev5: { "起動時刻":"2 days ago"    , "環境予約者":"yoko" , "DB向き先 tran":"dev"     , "DB向き先 master":"content" , "停止予定日":"2020/03/03"  },
    myapl_dev6: { "起動時刻":"42 minutes ago", "環境予約者":"chika", "DB向き先 tran":"dev2"    , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myapl_dev7: { "起動時刻":"2 years ago"   , "環境予約者":"yoko" , "DB向き先 tran":"dev"     , "DB向き先 master":"prod"    , "停止予定日":"2020/03/03"  },
    myapl_dev8: { "起動時刻":"2 days ago"    , "環境予約者":"chika", "DB向き先 tran":"prod"    , "DB向き先 master":"ita"     , "停止予定日":"2020/03/03"  },
    myapl_dev9: { "起動時刻":"11 days ago"   , "環境予約者":"hiro" , "DB向き先 tran":"ita"     , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myapl_dev0: { "起動時刻":"49 minutes ago", "環境予約者":"yoko" , "DB向き先 tran":"dev2"    , "DB向き先 master":"prod"    , "停止予定日":"2020/03/03"  },
    myweb_dev3: { "起動時刻":"2 years ago"   , "環境予約者":"hiro" , "DB向き先 tran":"dev"     , "DB向き先 master":"content" , "停止予定日":"2020/03/03"  },
    myweb_dev4: { "起動時刻":"2 days ago"    , "環境予約者":"yoko" , "DB向き先 tran":"prod"    , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myweb_dev5: { "起動時刻":"42 minutes ago", "環境予約者":"daich", "DB向き先 tran":"ita"     , "DB向き先 master":"ita"     , "停止予定日":"2020/03/03"  },
    myweb_dev6: { "起動時刻":"15 minutes ago", "環境予約者":"hiro" , "DB向き先 tran":"dev"     , "DB向き先 master":"prod"    , "停止予定日":"2020/03/03"  },
    myweb_dev7: { "起動時刻":"9 days ago"    , "環境予約者":"yoko" , "DB向き先 tran":"prod"    , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myweb_dev8: { "起動時刻":"2 days ago"    , "環境予約者":"chika", "DB向き先 tran":"dev"     , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    myweb_dev9: { "起動時刻":"49 minutes ago", "環境予約者":"yoko" , "DB向き先 tran":"ita"     , "DB向き先 master":"content" , "停止予定日":"2020/03/03"  },
    myweb_dev0: { "起動時刻":"15 minutes ago", "環境予約者":"chika", "DB向き先 tran":"prod"    , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    mymng_dev : { "起動時刻":"2 days ago"    , "環境予約者":"hiro" , "DB向き先 tran":"dev"     , "DB向き先 master":"content" , "停止予定日":"2020/03/03"  },
    mymng_dev1: { "起動時刻":"2 days ago"    , "環境予約者":"yoko" , "DB向き先 tran":"ita"     , "DB向き先 master":"ita"     , "停止予定日":"2020/03/03"  },
    mymng_dev2: { "起動時刻":"11 days ago"   , "環境予約者":"chika", "DB向き先 tran":"dev"     , "DB向き先 master":"prod"    , "停止予定日":"2020/03/03"  },
    mymng_dev3: { "起動時刻":"2 days ago"    , "環境予約者":"daich", "DB向き先 tran":"dev2"    , "DB向き先 master":"dev"     , "停止予定日":"2020/03/03"  },
    mymng_dev4: { "起動時刻":"6 days ago"    , "環境予約者":"yoko" , "DB向き先 tran":"dev"     , "DB向き先 master":"dev1"    , "停止予定日":"2020/06/15"  }
}

const DATA_INS_NAMES = Object.keys(DATA_ALL);

console.log('[data.js] debbug : DATA_ALL');
console.dir(DATA_ALL);
console.log('[data.js] debbug : DATA_INS_NAMES');
console.dir(DATA_INS_NAMES);
