import { useState, useEffect, useRef, useCallback } from "react";
import { off, onValue, ref } from "firebase/database";
import database from './firebase';
import Alert from "./Alert";
import { snapToArr } from "./helperfunc";

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

export const useRevisions = revIDs => {
  const [revs, setRevs] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  
  const listRef = ref(database, `revisions/${revIDs}`);
  useEffect(() => {
    setIsUpdating(true);
    
    onValue(listRef, snap => {
      setRevs(snapToArr(snap.val()));
      setIsUpdating(false);
    }, err => {
      Alert.error(err);
      console.log(err);
    })
    
    return () => {
      off(listRef);
    }
  }, [revIDs]);

  return [revs, isUpdating];
}


export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return {isOpen, onOpen, onClose};
}


