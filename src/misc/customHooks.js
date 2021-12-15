import { useState, useEffect, useRef, useCallback } from "react";
import { off } from "@firebase/database";
import { idObjToArr} from "./helperfunc";
import { SystemDB } from "../Database/SystemDB/SystemDB";
import { RevisionDB } from "../Database/SystemDB/RevisionDB/RevisionDB";
import { SubSystemDB } from "../Database/SystemDB/RevisionDB/SubSystemDB/SubSystemDB";
import { ComponentDB } from "../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentDB";
import { ComponentItemDB } from "../Database/SystemDB/RevisionDB/SubSystemDB/ComponentDB/ComponentItemDB/ComponentItemDB";


export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = evt => setMatches(evt.matches);
  
      queryList.addListener(listener);
      return () => queryList.removeListener(listener);
    }, [query]);
  
    return matches;
};

export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowHeight;
}

export const useHover = () => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
      }
      return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
      };
    },
    // es-lint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

export const useRevisions = sysID => {
  const [revs, setRevs] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  
  let revsRef;
  useEffect(() => {
    setIsUpdating(true);
    revsRef = RevisionDB.addListener(sysID, (v) => {
      const revOBJ = v;
      const revArr = idObjToArr(revOBJ);
      setRevs(revArr);
      setIsUpdating(false);
    })
    
    return () => {
      off(revsRef);
    }
  }, [sysID]);

  return {revs, isUpdating};
}

export const useSystems = () => {
  const [systems, setSystems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  let sysRef;
  useEffect(() => {
    setIsUpdating(true);
    
    sysRef = SystemDB.addListener((v) => {
      const systemsObj = v;
      const systemsArr = idObjToArr(systemsObj);
      setSystems(systemsArr);
      setIsUpdating(false);
    })
    
    return () => {
      off(sysRef);
    }
  }, []);
  return {systems, isUpdating}
}

export const useSubSystems = revID => {
  const [subSys, setSubSys] = useState([]);

  useEffect(() => {
    SubSystemDB.addListener(revID, (v) => {
      const subObj = v;
      const compArr = idObjToArr(subObj);
      compArr.sort((a,b) => (a.name>b.name ?  -1 :  1))
      setSubSys(compArr);
    })

  }, [revID]);

  // useEffect(() => {
  //   return () => {
  //     off(subRef);
  //   }
  // }, []);

  return subSys
}

export const useComponents = subSysID => {
  const [comps, setComps] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    ComponentDB.addListener(subSysID, (v) => {
      const compObj = v;
      const compArr = idObjToArr(compObj);
      setComps(compArr);
      setIsUpdating(false);
    })

  }, [subSysID]);

  // useEffect(() => {
  //   return () => {
  //     off(compRef);
  //   }
  // }, []);

  return {comps, isUpdating}
}


export const useCompItems = compID => {
  const [compItems, setCompItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    ComponentItemDB.addListener(compID, (v) => {
      const obj = v;
      const arr = idObjToArr(obj);
      setCompItems(arr);
      setIsUpdating(false);
    })

  }, [compID]);

  // useEffect(() => {
  //   return () => {
  //     off(compRef);
  //   }
  // }, []);

  return {compItems, isUpdating}
}


export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return {isOpen, onOpen, onClose};
}


